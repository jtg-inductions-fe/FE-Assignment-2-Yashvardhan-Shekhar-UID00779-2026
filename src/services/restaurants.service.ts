import { AppDispatch } from '@store';
import { addRestaurant, removeRestaurant, updateRestaurant } from '@store';
import { Restaurant } from '@types';
import { alert } from '@utils';

// Generates a unique ID, adds the restaurant to Redux state, and shows a success alert
export const handleCreateRestaurant = (
    data: Restaurant,
    dispatch: AppDispatch,
): void => {
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
};

// Updates existing restaurant details in Redux state and shows a success alert
export const handleEditRestaurant = (
    data: Restaurant,
    dispatch: AppDispatch,
): void => {
    dispatch(updateRestaurant(data));
    alert('success', `Restaurant ${data.name} has been updated.`, dispatch);
};

// Removes the specified restaurant from Redux state and shows a success alert
export const handleDeleteRestaurant = (
    data: Restaurant,
    dispatch: AppDispatch,
): void => {
    dispatch(removeRestaurant(data.id));
    alert('success', `Restaurant ${data.name} has been deleted.`, dispatch);
};
