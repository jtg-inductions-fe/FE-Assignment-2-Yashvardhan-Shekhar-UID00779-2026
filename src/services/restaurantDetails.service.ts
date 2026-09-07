import {
    addMenuItem,
    AppDispatch,
    removeMenuItem,
    setRestaurant,
    updateMenuItem,
    updateRestaurantDetails,
} from '@store';
import { MenuItem, Restaurant, RestaurantDetails } from '@types';
import { alert, delay, handleErrorFeedback, stopLoading } from '@utils';

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
        dispatch(setRestaurant(null));
        // will be replaced with actual api call
        await delay();
        const res = await fetch('/data/RestaurantDetails.json');
        const data = (await res.json()) as RestaurantDetails;
        dispatch(setRestaurant(data));
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    } finally {
        stopLoading(dispatch);
    }
};

/**
 * Edits restaurant details
 * @param data new restaurant details
 * @param dispatch store dispatch
 */
export const editRestaurantDetailsService = async (
    data: Restaurant,
    dispatch: AppDispatch,
) => {
    try {
        await delay();
        dispatch(updateRestaurantDetails(data));
        alert('success', `Restaurant details has been updated.`, dispatch);
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
