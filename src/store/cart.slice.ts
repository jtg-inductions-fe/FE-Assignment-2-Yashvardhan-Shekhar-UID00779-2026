import { CartItem } from 'types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartItem[] = [];

// creating slice and reduces for cart to update values
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(
                (item: CartItem) => item.id === action.payload,
            );
            if (index !== -1) {
                state[index].quantity += 1;
            } else {
                state.push({ id: action.payload, quantity: 1 });
            }
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(
                (item: CartItem) => item.id === action.payload,
            );
            if (index !== -1) {
                state[index].quantity -= 1;
                if (state[index].quantity === 0) state.splice(index, 1);
            }
        },
    },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
