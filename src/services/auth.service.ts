import { NavigateFunction } from 'react-router';

import { PATH } from '@constant';
import { AppDispatch } from '@store';
import { stopStartupLoading, updateUser } from '@store';
import { alert, handleErrorFeedback } from '@utils';

import { api, refreshAccessToken, setAccessToken } from './api.service';
import {
    AccessTokenResponse,
    LoginType,
    SignupType,
    UserDetailsResponse,
} from './ApiResponse.types';

const getProfile = async () => {
    const { data } = await api.get<UserDetailsResponse>('/profile');

    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
    };
};

export const signUp = async (
    user: SignupType,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
) => {
    try {
        const body = new URLSearchParams();

        body.set('name', user.name);
        body.set('email', user.email);
        body.set('password', user.password);
        body.set('role', user.role);

        if (user.address != null) body.set('address', user.address);
        if (user.city != null) body.set('city', user.city);
        if (user.state != null) body.set('state', user.state);
        if (user.contact_number != null) {
            body.set('contact_number', user.contact_number);
        }

        const { data } = await api.post<AccessTokenResponse>(
            '/auth/signup',
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        setAccessToken(data.access_token);

        const userInfo = await getProfile();

        dispatch(updateUser(userInfo));
        alert('success', 'Account created successfully', dispatch);
        await navigate(PATH.HOME);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};

export const login = async (
    user: LoginType,
    dispatch: AppDispatch,
    navigate: NavigateFunction,
) => {
    try {
        const body = new URLSearchParams({
            username: user.email,
            password: user.password,
        });

        const { data } = await api.post<AccessTokenResponse>(
            '/auth/login',
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        setAccessToken(data.access_token);

        const userInfo = await getProfile();

        dispatch(updateUser(userInfo));
        alert('success', 'Logged in successfully', dispatch);
        await navigate(PATH.HOME);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};

export const logout = async (dispatch: AppDispatch) => {
    try {
        await api.post('/auth/logout');
        alert('success', 'Logged out successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    } finally {
        setAccessToken(null);
        dispatch(updateUser(null));
        localStorage.removeItem('user');
    }
};

export const initializeAuth = async (dispatch: AppDispatch) => {
    try {
        await refreshAccessToken();

        const userInfo = await getProfile();
        dispatch(updateUser(userInfo));
    } catch {
        setAccessToken(null);
        dispatch(updateUser(null));
    } finally {
        dispatch(stopStartupLoading());
    }
};
