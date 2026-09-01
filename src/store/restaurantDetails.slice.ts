import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, RestaurantDetails } from '@types';

import { RestaurantDetailsState } from './store.type';

/**
 * initial state of the RestaurantDetailsState
 */
const initialState: RestaurantDetailsState = {
    restaurant: null,
};

/**
 * restaurant slice with reducers
 */
export const restaurantSlice = createSlice({
    name: 'restaurantDetails',
    initialState,
    reducers: {
        setRestaurant: (state, action: PayloadAction<RestaurantDetails>) => {
            state.restaurant = action.payload;
        },

        addMenuItem: (state, action: PayloadAction<MenuItem>) => {
            if (state.restaurant) {
                state.restaurant.menu.push(action.payload);
            }
        },

        updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
            if (state.restaurant) {
                const index = state.restaurant.menu.findIndex(
                    (item) => item.id === action.payload.id,
                );
                if (index !== -1) {
                    state.restaurant.menu[index] = action.payload;
                }
            }
        },

        removeMenuItem: (state, action: PayloadAction<string>) => {
            if (state.restaurant) {
                state.restaurant.menu = state.restaurant.menu.filter(
                    (item) => item.id !== action.payload,
                );
            }
        },
    },
});

export const { setRestaurant, addMenuItem, updateMenuItem, removeMenuItem } =
    restaurantSlice.actions;

export default restaurantSlice.reducer;
