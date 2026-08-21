import { useDispatch, useSelector, useStore } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { AppDispatch, AppStore, RootState } from '@types';

import userReducer from './userSlice';

// main store config
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export { updateUser } from './userSlice';
