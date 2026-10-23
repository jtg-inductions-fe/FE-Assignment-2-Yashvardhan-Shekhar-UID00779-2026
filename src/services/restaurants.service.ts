import { FETCH_LIMIT } from '@constant';
import {
    addRestaurant,
    AppDispatch,
    removeRestaurant,
    setRestaurants,
    updateRestaurant,
} from '@store';
import { Restaurant } from '@types';
import { alert, handleErrorFeedback, stopLoading } from '@utils';

import { api } from './api.service';

type RestaurantApiResponse = {
    id: string;
    name: string;
    description: string;
    address: string | null;
    city: string | null;
    state: string | null;
    is_veg: boolean;
    opening_time: string;
    closing_time: string;
    image: string | null;
};

type RestaurantListResponse = {
    items: RestaurantApiResponse[];
    total: number;
    current_page: string | null;
    current_page_backwards: string | null;
    previous_page: string | null;
    next_page: string | null;
};

const mapRestaurantFromApi = (data: RestaurantApiResponse): Restaurant => ({
    id: data.id,
    name: data.name,
    description: data.description,
    openingTime: data.opening_time.slice(0, 5),
    closingTime: data.closing_time.slice(0, 5),
    isVeg: data.is_veg,
    image: data.image ?? '',
});

const mapRestaurantToApi = (data: Restaurant) => ({
    name: data.name,
    description: data.description,
    is_veg: data.isVeg,
    opening_time: data.openingTime,
    closing_time: data.closingTime,
    image: data.image || null,
});

/**
 * Fetches the first page or the next page of restaurants.
 * @param dispatch Redux dispatch
 * @param cursor Cursor for the next page. Omit for the first page.
 * @returns Cursor for the next page, or null when no more pages exist.
 */
export const getRestaurantsService = async (
    dispatch: AppDispatch,
    cursor?: string | null,
): Promise<string | null> => {
    try {
        const { data } = await api.get<RestaurantListResponse>('/restaurants', {
            params: {
                size: FETCH_LIMIT,
                type: 'ALL',
                ...(cursor ? { cursor } : {}),
            },
        });

        const restaurants = data.items.map(mapRestaurantFromApi);

        if (cursor) {
            restaurants.forEach((restaurant) => {
                dispatch(addRestaurant(restaurant));
            });
        } else {
            dispatch(setRestaurants(restaurants));
        }

        return data.next_page;
    } catch (error) {
        handleErrorFeedback(error, dispatch);
        return null;
    } finally {
        if (!cursor) {
            stopLoading(dispatch);
        }
    }
};

export const createRestaurantService = async (
    data: Restaurant,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        const response = await api.post<RestaurantApiResponse>(
            '/restaurants',
            mapRestaurantToApi(data),
        );

        dispatch(addRestaurant(mapRestaurantFromApi(response.data)));

        alert('success', 'Restaurant created successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};

export const editRestaurantService = async (
    data: Restaurant,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        const response = await api.put<RestaurantApiResponse>(
            `/restaurants/${data.id}`,
            mapRestaurantToApi(data),
        );

        dispatch(updateRestaurant(mapRestaurantFromApi(response.data)));

        alert('success', 'Restaurant updated successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};

export const deleteRestaurantService = async (
    data: Restaurant,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        await api.delete(`/restaurants/${data.id}`);

        dispatch(removeRestaurant(data.id));

        alert('success', 'Restaurant deleted successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};
