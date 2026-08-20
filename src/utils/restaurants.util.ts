// restaurantUtils.ts

import {
    createRestaurant as apiCreateRestaurant,
    deleteRestaurant as apiDeleteRestaurant,
    editRestaurant as apiEditRestaurant,
} from '@services';
import { Restaurant } from '@types';

export const handleCreateRestaurant = async (
    restaurants: Restaurant[],
    data: Restaurant,
): Promise<Restaurant[]> => {
    try {
        data.id = 'RID-' + Math.random().toString().substring(2, 8);
        const result = await apiCreateRestaurant(data);

        if (result.success) {
            return [...restaurants, result.data];
        }

        return restaurants;
    } catch {
        return restaurants;
    }
};

export const handleEditRestaurant = async (
    restaurants: Restaurant[],
    data: Restaurant,
): Promise<Restaurant[]> => {
    try {
        const result = await apiEditRestaurant(data);

        if (result.success) {
            return restaurants.map((restaurant) =>
                restaurant.id === result.data.id ? result.data : restaurant,
            );
        }

        return restaurants;
    } catch {
        return restaurants;
    }
};

export const handleDeleteRestaurant = async (
    restaurants: Restaurant[],
    id: string,
): Promise<Restaurant[]> => {
    try {
        const result = await apiDeleteRestaurant(id);

        if (result.success) {
            return restaurants.filter((restaurant) => restaurant.id !== id);
        }

        return restaurants;
    } catch {
        return restaurants;
    }
};
