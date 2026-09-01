import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CartItem, MenuItem } from '@types';

import { CartState } from './store.type';

/**
 * Defines the initial state for the cart slice.
 */
const initialState: CartState = {
    cartItems: [],
};

/**
 * Redux slice responsible for managing shopping cart items.
 * Provides actions to add items to the cart and remove items from the cart.
 */
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        /**
         * Adds an item to the cart or increases its quantity if it already exists.
         * @param state - Current cart state.
         * @param action - Action containing the ID of the item to add.
         */
        addItemToCart: (state, action: PayloadAction<MenuItem>) => {
            const index = state.cartItems.findIndex(
                (item: CartItem) => item.id === action.payload.id,
            );

            if (index !== -1) {
                state.cartItems[index].quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        /**
         * Removes one quantity of an item from the cart. Removes the item completely when its quantity reaches zero.
         * @param state - Current cart state.
         * @param action - Action containing the ID of the item to remove.
         */
        removeItemFromCart: (state, action: PayloadAction<MenuItem>) => {
            const index = state.cartItems.findIndex(
                (item: CartItem) => item.id === action.payload.id,
            );

            if (index !== -1) {
                state.cartItems[index].quantity -= 1;

                if (state.cartItems[index].quantity === 0) {
                    state.cartItems.splice(index, 1);
                }
            }
        },
    },
});

/**
 * Action creators for adding and removing items from the shopping cart.
 */
export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
