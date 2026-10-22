import {
    addMenuItem,
    AppDispatch,
    clearCart,
    removeMenuItem,
    setRestaurant,
    updateMenuItem,
    updateRestaurantDetails,
} from '@store';
import { MenuItem, Restaurant } from '@types';
import { alert, handleErrorFeedback, stopLoading } from '@utils';

import { api } from './api.service';
import {
    MenuItemApiResponse,
    RestaurantDetailsApiResponse,
} from './ApiResponse.types';

const mapMenuItemFromApi = (data: MenuItemApiResponse): MenuItem => ({
    id: data.id,
    name: data.dish_name,
    description: data.description ?? '',
    price: Number(data.price),
    stock: data.stock,
    image: data.image_url ?? '',
});

const mapRestaurantDetailsFromApi = (data: RestaurantDetailsApiResponse) => ({
    id: data.id,
    name: data.name,
    description: data.description,
    address: data.address ?? '',
    city: data.city ?? '',
    state: data.state ?? '',
    isVeg: data.is_veg,
    openingTime: data.opening_time.slice(0, 5),
    closingTime: data.closing_time.slice(0, 5),
    image: data.image ?? '',
    menu: data.menu.map(mapMenuItemFromApi),
});

const mapRestaurantToApi = (data: Restaurant) => ({
    name: data.name,
    description: data.description,
    is_veg: data.isVeg,
    opening_time: data.openingTime,
    closing_time: data.closingTime,
    image: data.image || null,
});

const mapMenuItemToApi = (data: MenuItem, isVeg: boolean) => ({
    dish_name: data.name,
    description: data.description || null,
    price: data.price,
    is_veg: isVeg,
    stock: data.stock,
    image_url: data.image || null,
    category: data.name,
});

export const getRestaurantDetailsService = async (
    restaurantId: string | undefined,
    dispatch: AppDispatch,
) => {
    dispatch(setRestaurant(null));
    dispatch(clearCart());

    if (!restaurantId) {
        stopLoading(dispatch);
        return;
    }

    try {
        const { data } = await api.get<RestaurantDetailsApiResponse>(
            `/restaurants/${restaurantId}`,
        );

        dispatch(setRestaurant(mapRestaurantDetailsFromApi(data)));
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    } finally {
        stopLoading(dispatch);
    }
};

export const editRestaurantDetailsService = async (
    data: Restaurant,
    dispatch: AppDispatch,
) => {
    try {
        const response = await api.put<RestaurantDetailsApiResponse>(
            `/restaurants/${data.id}`,
            mapRestaurantToApi(data),
        );

        dispatch(
            updateRestaurantDetails(mapRestaurantDetailsFromApi(response.data)),
        );

        alert('success', 'Restaurant details updated successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};

export const handleCreateMenuItem = async (
    data: MenuItem,
    restaurant: Restaurant,
    dispatch: AppDispatch,
) => {
    try {
        const response = await api.post<MenuItemApiResponse>(
            `/restaurants/${restaurant.id}/menu-items`,
            mapMenuItemToApi(data, restaurant.isVeg),
        );

        dispatch(addMenuItem(mapMenuItemFromApi(response.data)));

        alert('success', 'Menu item created successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};

export const handleEditMenuItem = async (
    data: MenuItem,
    restaurant: Restaurant,
    dispatch: AppDispatch,
) => {
    try {
        const response = await api.put<MenuItemApiResponse>(
            `/restaurants/${restaurant.id}/menu-items/${data.id}`,
            mapMenuItemToApi(data, restaurant.isVeg),
        );

        dispatch(updateMenuItem(mapMenuItemFromApi(response.data)));

        alert('success', 'Menu item updated successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};

export const handleDeleteMenuItem = async (
    data: MenuItem,
    restaurant: Restaurant,
    dispatch: AppDispatch,
) => {
    try {
        await api.delete(`/restaurants/${restaurant.id}/menu-items/${data.id}`);

        dispatch(removeMenuItem(data.id));

        alert('success', 'Menu item deleted successfully', dispatch);
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};
