import {
    addMenuItem,
    addRestaurant,
    AppDispatch,
    removeMenuItem,
    removeRestaurant,
    setRestaurant,
    setRestaurants,
    updateMenuItem,
    updateRestaurant,
} from '@store';
import { MenuItem, Restaurant, RestaurantDetails } from '@types';
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

/**
 * get Restaurants and set them in store
 * @param rid restaurant id
 * @param dispatch store dispatch
 */
export const getRestaurantDetailsService = async (
    _rid: string | undefined,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // will be replaced with actual api call
        const res = await fetch('/data/RestaurantDetails.json');
        const data = (await res.json()) as RestaurantDetails;
        dispatch(setRestaurant(data));
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Generates a unique ID, adds the menu item to Redux state, and shows a success alert
 * @param data new menu item
 * @param dispatch store dispatch
 */
export const handleCreateMenuItem = async (
    data: MenuItem,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // delay will be replaced with actual api call
        await delay();

        const newMenuItem: MenuItem = {
            ...data,
            id: crypto.randomUUID(),
        };
        dispatch(addMenuItem(newMenuItem));
        alert(
            'success',
            `Menu item ${newMenuItem.name} has been created.`,
            dispatch,
        );
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Updates existing menu item details in Redux state and shows a success alert
 * @param data updated data of the menu item
 * @param dispatch store dispatch
 */
export const handleEditMenuItem = async (
    data: MenuItem,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // delay will be replaced with actual api call
        await delay();

        dispatch(updateMenuItem(data));
        alert('success', `Menu item ${data.name} has been updated.`, dispatch);
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Removes the specified menu item from Redux state and shows a success alert
 * @param data menu item
 * @param dispatch app dispatch
 */
export const handleDeleteMenuItem = async (
    data: MenuItem,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // delay will be replaced with actual api call
        await delay();

        dispatch(removeMenuItem(data.id));
        alert('success', `Menu item ${data.name} has been deleted.`, dispatch);
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};
