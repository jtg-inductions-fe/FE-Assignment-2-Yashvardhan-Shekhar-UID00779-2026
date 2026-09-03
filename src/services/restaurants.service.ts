import {
    addRestaurant,
    AppDispatch,
    removeRestaurant,
    setRestaurants,
    updateRestaurant,
} from '@store';
import { Restaurant } from '@types';
import { alert, delay, handleErrorFeedback } from '@utils';

/**
 * Fetches the restaurant list from the local data source and stores the restaurants in the Redux state.
 * @param dispatch - Redux dispatch function used to update the restaurant state.
 */
export const getRestaurantsService = async (
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // will be replaced with actual api call
        const res = await fetch('/data/Restaurants.json');
        const restaurants = (await res.json()) as Restaurant[];
        dispatch(setRestaurants(restaurants));
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Creates a new restaurant with a unique ID, adds it to the Redux state, and displays a success alert.
 * @param data - Restaurant details used to create the new restaurant.
 * @param dispatch - Redux dispatch function used to update the restaurant state.
 */
export const createRestaurantService = async (
    data: Restaurant,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // delay will be replaced with actual api call
        await delay();
        // to create unique id to manage in store for now
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
 * @param data - Updated restaurant details.
 * @param dispatch - Redux dispatch function used to update the restaurant state.
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
 * @param data - Restaurant to be removed.
 * @param dispatch - Redux dispatch
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
