import { useDispatch, useSelector, useStore } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { AppDispatch, AppStore, RootState } from '@types';

import userReducer from './user.slice';

// Configure the Redux store
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Typed Redux dispatch hook
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Typed Redux selector hook
export const useAppSelector = useSelector.withTypes<RootState>();

// Typed Redux store hook
export const useAppStore = useStore.withTypes<AppStore>();
