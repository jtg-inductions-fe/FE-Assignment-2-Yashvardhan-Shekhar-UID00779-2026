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
        /**
         * sets the list of orders
         * @param state current order state
         * @param action contains the list of orders
         */
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
        /**
         * updates the status of an order
         * @param state current order state
         * @param action contains the order id and next status
         */
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
