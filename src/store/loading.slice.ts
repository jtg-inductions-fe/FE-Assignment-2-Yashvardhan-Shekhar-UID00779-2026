import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**  Defines the initial state for the loading slice. */
const initialState = {
    isLoading: true,
    isStartupLoading: true,
};

/**
 * Redux slice responsible for managing application loading state Provides an action to update the loading severity and message.
 */
export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        /**
         * Updates the current loading state with true value.
         * @param state - Current loading state.
         * @param action - loading state value true for show loading
         */
        updateLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        /**
         * Updates the current loading state with true value.
         * @param state - Current starting state.
         * @param action - loading state value true for show startup loading
         */
        stopStartupLoading: (state) => {
            state.isStartupLoading = false;
        },
    },
});

/**
 * Action creator for updating the application loading state.
 */
export const { updateLoading, stopStartupLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
