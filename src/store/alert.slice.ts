import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Alert } from './store.type';

/**
 * Defines the initial state for the alert slice.
 */
const initialState: Alert = {
    severity: 'info',
    message: '',
    isOpen: false,
};

/**
 * Redux slice responsible for managing application alert state Provides an action to update the alert severity and message.
 */
export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        /**
         * Updates the current alert state with the provided severity and message.
         * @param state - Current alert state.
         * @param action - new alert you want to display
         */
        updateAlert: (state, action: PayloadAction<Alert>): void => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.isOpen = true;
        },
        /**
         * Updates the current alert state with the provided severity and message.
         * @param state - Current alert state.
         */
        closeAlert: (state): void => {
            state.isOpen = false;
        },
    },
});

/**
 * Action creator for updating the application alert state.
 */
export const { updateAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
