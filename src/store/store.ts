import { useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './alert.slice';
import cartReducer from './cart.slice';
import loadingReducer from './loading.slice';
import ordersReducer from './orders.slice';
import restaurantDetailsReducer from './restaurantDetails.slice';
import restaurantReducer from './restaurants.slice';
import { AppDispatch, RootState } from './store.type';
import userReducer from './user.slice';

/**
 * Configures the application's Redux store with user and alert reducers.
 */
export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        restaurant: restaurantReducer,
        cart: cartReducer,
        restaurantDetails: restaurantDetailsReducer,
        orders: ordersReducer,
        loading: loadingReducer,
    },
});

/**
 * Typed Redux dispatch hook for dispatching application actions.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed Redux selector hook for accessing application state.
 */
export const useAppSelector = useSelector.withTypes<RootState>();
