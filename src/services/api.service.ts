import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { AppDispatch } from '@store';
import { alert } from '@utils';

const API_BASE_URL = 'http://localhost:8000';

type AccessTokenResponse = {
    access_token: string;
    token_type: string;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

type ApiErrorDetail = {
    msg?: string;
};

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let accessToken: string | null = null;

let refreshPromise: Promise<string> | null = null;

export const setAccessToken = (token: string | null): void => {
    accessToken = token;
};

export const refreshAccessToken = async (): Promise<string> => {
    if (!refreshPromise) {
        refreshPromise = axios
            .get<AccessTokenResponse>(`${API_BASE_URL}/auth/refresh`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                setAccessToken(data.access_token);
                return data.access_token;
            })
            .catch((error: unknown) => {
                setAccessToken(null);
                throw error;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config as RetryableRequestConfig | undefined;

        const url = config?.url ?? '';

        const isAuthEndpoint =
            url.includes('/auth/login') ||
            url.includes('/auth/signup') ||
            url.includes('/auth/logout') ||
            url.includes('/auth/refresh');

        if (
            error.response?.status !== 401 ||
            !config ||
            config._retry ||
            isAuthEndpoint
        ) {
            return Promise.reject(error);
        }

        config._retry = true;

        try {
            const token = await refreshAccessToken();

            config.headers.set('Authorization', `Bearer ${token}`);

            return api.request(config);
        } catch {
            setAccessToken(null);
            return Promise.reject(error);
        }
    },
);

/**
 * Converts Axios/FastAPI errors into readable Error objects.
 */
export const getApiError = (error: unknown): Error => {
    if (!axios.isAxiosError(error)) {
        return error instanceof Error
            ? error
            : new Error('Unknown error has occurred');
    }

    const detail: unknown = error.response?.data;

    if (typeof detail === 'string') {
        return new Error(detail);
    }

    if (Array.isArray(detail)) {
        const messages = detail
            .map((item: ApiErrorDetail) => item.msg)
            .filter(
                (message): message is string =>
                    typeof message === 'string' && message.length > 0,
            );

        if (messages.length > 0) {
            return new Error(messages.join(', '));
        }
    }

    return new Error(error.message || 'Request failed');
};

/**
 * Displays API or application errors using the existing alert utility.
 */
export const handleErrorFeedback = (
    error: unknown,
    dispatch: AppDispatch,
): void => {
    const apiError = getApiError(error);

    alert('error', apiError.message, dispatch);
};
