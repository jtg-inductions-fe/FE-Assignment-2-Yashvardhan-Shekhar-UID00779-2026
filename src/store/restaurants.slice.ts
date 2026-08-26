import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '@types';

type RestaurantState = {
    restaurants: Restaurant[];
};

const initialState: RestaurantState = {
    restaurants: [],
};

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
