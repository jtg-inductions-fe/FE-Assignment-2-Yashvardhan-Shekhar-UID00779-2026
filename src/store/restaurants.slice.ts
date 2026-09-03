import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '@types';

import { RestaurantState } from './store.type';
/**
 * initial state of the store
 */
const initialState: RestaurantState = {
    restaurants: [],
};

/**
 * slice of restaurant containing reducer
 */
export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        /**
         * set restaurants into the slice
         * @param state state of current restaurant slice
         * @param action array of restaurants
         */
        setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
            state.restaurants = action.payload;
        },

        /**
         * adds new restaurant
         * @param state state of current restaurant slice
         * @param action Restaurant information of the new restaurant
         */
        addRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurants.push(action.payload);
        },

        /**
         * updates the restaurant with the given details
         * @param state state of current restaurant slice
         * @param action details of with which existing restaurant will be updated
         */
        updateRestaurant: (state, action: PayloadAction<Restaurant>) => {
            const index = state.restaurants.findIndex(
                (r) => r.id === action.payload.id,
            );
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
        },

        /**
         * deletes the restaurants with given Rid
         * @param state updates the restaurant with the given details
         * @param action Restaurant id
         */
        removeRestaurant: (state, action: PayloadAction<string>) => {
            state.restaurants = state.restaurants.filter(
                (r) => r.id !== action.payload,
            );
        },
    },
});

export const {
    addRestaurant,
    updateRestaurant,
    removeRestaurant,
    setRestaurants,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
