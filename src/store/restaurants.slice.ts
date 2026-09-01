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
        setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
            state.restaurants = action.payload;
        },
        addRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurants.push(action.payload);
        },
        updateRestaurant: (state, action: PayloadAction<Restaurant>) => {
            const index = state.restaurants.findIndex(
                (r) => r.id === action.payload.id,
            );
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
        },
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
