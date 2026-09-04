import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@types';

/**
 * Defines the initial state for the user slice.
 */
const initialState: User = {
    id: '',
    name: '',
    email: '',
    role: 'customer',
};

/**
 * Redux slice responsible for managing the authenticated user's state.
 * Provides an action to update user information or reset it to default values.
 */
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Updates the current user state with the provided user information.
         * Resets the user state to default values when no user is provided.
         * @param state - Current user state.
         * @param action - Action containing the updated user data or null.
         */
        updateUser: (state, action: PayloadAction<User | null>): void => {
            state.id = action.payload?.id || '';
            state.name = action.payload?.name || '';
            state.email = action.payload?.email || '';
            state.role = action.payload?.role || 'customer';
        },
    },
});

/**
 * Action creator for updating the authenticated user's state.
 */
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
