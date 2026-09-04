import { useDispatch, useSelector, useStore } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './alert.slice';
import { AppDispatch, AppStore, RootState } from './store.type';
import userReducer from './user.slice';

/**
 * Configures the application's Redux store with user and alert reducers.
 */
export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
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

/**
 * Typed Redux store hook for accessing the configured application store.
 */
export const useAppStore = useStore.withTypes<AppStore>();
