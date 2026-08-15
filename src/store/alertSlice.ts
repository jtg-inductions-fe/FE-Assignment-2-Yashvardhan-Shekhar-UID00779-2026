import { Alert } from 'types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Alert = {
    severity: null,
    message: '',
};

// creating slice and reduces for alert to update values
export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        updateAlert: (state, action: PayloadAction<Alert>) => {
            state.severity = action.payload?.severity;
            state.message = action.payload?.message;
        },
    },
});

export const { updateAlert } = alertSlice.actions;

export default alertSlice.reducer;
