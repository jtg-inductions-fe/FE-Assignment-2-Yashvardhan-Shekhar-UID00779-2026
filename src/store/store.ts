import { useDispatch, useSelector, useStore } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './alert.slice';
import { AppDispatch, AppStore, RootState } from './store.type';
import userReducer from './user.slice';

// main store config
export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
    },
});

// Typed Redux dispatch hook
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// Typed Redux selector hook
export const useAppSelector = useSelector.withTypes<RootState>();
// Typed Redux store hook
export const useAppStore = useStore.withTypes<AppStore>();
