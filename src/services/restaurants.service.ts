import { AppDispatch, setRestaurants } from '@store';
import { addRestaurant, removeRestaurant, updateRestaurant } from '@store';
import { Restaurant } from '@types';
import { alert, delay, handleErrorFeedback } from '@utils';

/**
 * Fetches the restaurant list from the local data source and stores the restaurants in the Redux state.
 *
 * @param {AppDispatch} dispatch - Redux dispatch function used to update the restaurant state.
 * @returns {Promise<void>} A promise that resolves when the restaurant data has been processed.
 */
export const getRestaurantsService = async (
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // will be replaced with actual api call
        const res = await fetch('data/Restaurants.json');
        const restaurants = (await res.json()) as Restaurant[];
        dispatch(setRestaurants(restaurants));
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Creates a new restaurant with a unique ID, adds it to the Redux state, and displays a success alert.
 *
 * @param {Restaurant} data - Restaurant details used to create the new restaurant.
 * @param {AppDispatch} dispatch - Redux dispatch function used to update the restaurant state.
 * @returns {Promise<void>} A promise that resolves when the restaurant has been created.
 */
export const createRestaurantService = async (
    data: Restaurant,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // delay will be replaced with actual api call
        await delay();

        const newRestaurant: Restaurant = {
            ...data,
            id: crypto.randomUUID(),
        };

        dispatch(addRestaurant(newRestaurant));

        alert(
            'success',
            `Restaurant ${newRestaurant.name} has been created.`,
            dispatch,
        );
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Updates an existing restaurant in the Redux state and displays a success alert.
 *
 * @param {Restaurant} data - Updated restaurant details.
 * @param {AppDispatch} dispatch - Redux dispatch function used to update the restaurant state.
 * @returns {Promise<void>} A promise that resolves when the restaurant has been updated.
 */
export const editRestaurantService = async (
    data: Restaurant,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // delay will be replaced with actual api call
        await delay();

        dispatch(updateRestaurant(data));

        alert('success', `Restaurant ${data.name} has been updated.`, dispatch);
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Deletes a restaurant from the Redux state and displays a success alert.
 *
 * @param {Restaurant} data - Restaurant to be removed.
 * @param {AppDispatch} dispatch - Redux dispatch
 * @returns {Promise<void>} A void promise
 */
export const deleteRestaurantService = async (
    data: Restaurant,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // delay will be replaced with actual api call
        await delay();

        dispatch(removeRestaurant(data.id));

        alert('success', `Restaurant ${data.name} has been deleted.`, dispatch);
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};
