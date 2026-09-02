import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '@types';

import { OrderState } from './store.type';

/**
 * Defines the initial state for the order slice.
 */
const initialState: OrderState = {
    orders: [],
};

/**
 * Redux slice responsible for managing shopping order items.
 *
 * Provides actions to add items to the order and remove items from the order.
 */
export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
        updateOrderState: (
            state,
            action: PayloadAction<{ orderId: string; nextStatus: OrderStatus }>,
        ) => {
            const index = state.orders.findIndex(
                (order) => order.id === action.payload.orderId,
            );
            if (index !== -1) {
                state.orders[index].status = action.payload.nextStatus;
            }
        },
    },
});

/**
 * Action creators for adding and removing items from the shopping order.
 */
export const { setOrders, updateOrderState } = orderSlice.actions;

export default orderSlice.reducer;
