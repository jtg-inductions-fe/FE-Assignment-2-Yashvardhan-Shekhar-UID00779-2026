import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '@types';

const initialState: User = {
    id: '',
    name: '',
    email: '',
    role: 'customer',
};

// creating slice and reduces for user to update values
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User | null>) => {
            state.id = action.payload?.id || '';
            state.name = action.payload?.name || '';
            state.email = action.payload?.email || '';
            state.role = action.payload?.role || 'customer';
        },
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
