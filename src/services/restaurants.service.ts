import mockRestaurants from '@data/mockRestaurants.json';
import { Restaurant } from '@types';
import { alert, delay } from '@utils';

let restaurantsData: Restaurant[] = [...(mockRestaurants as Restaurant[])];

export const getRestaurants = async (): Promise<Restaurant[]> => {
    await delay(500);
    return restaurantsData;
};

export const createRestaurant = async (
    data: Restaurant,
): Promise<{ success: boolean; data: Restaurant }> => {
    await delay(500);

    restaurantsData = [...restaurantsData, data];

    alert('success', `Restaurant ${data.name} has been created.`);

    return {
        success: true,
        data,
    };
};

export const editRestaurant = async (
    data: Restaurant,
): Promise<{ success: boolean; data: Restaurant }> => {
    await delay(500);

    restaurantsData = restaurantsData.map((restaurant) =>
        restaurant.id === data.id ? data : restaurant,
    );

    alert('success', `Restaurant ${data.name} has been updated.`);

    return {
        success: true,
        data,
    };
};

export const deleteRestaurant = async (
    id: string,
): Promise<{ success: boolean }> => {
    await delay(500);

    const restaurantToDelete = restaurantsData.find(
        (restaurant) => restaurant.id === id,
    );

    if (!restaurantToDelete) {
        return {
            success: false,
        };
    }

    restaurantsData = restaurantsData.filter(
        (restaurant) => restaurant.id !== id,
    );

    alert('success', `Restaurant ${restaurantToDelete.name} has been deleted.`);

    return {
        success: true,
    };
};
