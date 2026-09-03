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
        /**
         * set restaurant details
         * @param state state of current slice ie restaurant details
         * @param action the actual payload containing RestaurantDetails
         */
        setRestaurant: (state, action: PayloadAction<RestaurantDetails>) => {
            state.restaurant = action.payload;
        },

        /**
         * add new Menu Item in the menu
         * @param state state of current slice ie restaurant details
         * @param action details of new Menu Item
         */
        addMenuItem: (state, action: PayloadAction<MenuItem>) => {
            if (state.restaurant) {
                state.restaurant.menu.push(action.payload);
            }
        },

        /**
         * updates existing menu Item
         * @param state state of current slice ie restaurant details
         * @param action details of the updated menu Item
         */
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

        /**
         * removes the menuItem if present
         * @param state state of current slice ie restaurant details
         * @param action id of the menuItem
         */
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
