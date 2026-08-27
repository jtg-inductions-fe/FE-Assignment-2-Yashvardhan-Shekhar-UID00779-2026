import { CartItem } from 'types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type CartState = {
    cartItems: CartItem[];
};

const initialState: CartState = {
    cartItems: [],
};

// creating slice and reduces for cart to update values
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<string>) => {
            const index = state.cartItems.findIndex(
                (item: CartItem) => item.id === action.payload,
            );
            if (index !== -1) {
                state.cartItems[index].quantity += 1;
            } else {
                state.cartItems.push({ id: action.payload, quantity: 1 });
            }
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const index = state.cartItems.findIndex(
                (item) => item.id === action.payload,
            );
            if (index !== -1) {
                state.cartItems[index].quantity -= 1;
                if (state.cartItems[index].quantity === 0)
                    state.cartItems.splice(index, 1);
            }
        },
    },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
