import { useDispatch, useSelector, useStore } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { AppDispatch, AppStore, RootState } from '@types';

import alertReducer from './alert.slice';
import userReducer from './user.slice';

// dispatch global declaration
let dispatch: AppDispatch;

// initialization of  global declaration dispatch
export const setUpDispatch = (dsp: AppDispatch) => {
    dispatch = dsp;
};

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

export { dispatch };
