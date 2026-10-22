import {
    AppDispatch,
    clearCart,
    setOrders,
    store,
    updateOrderState,
} from '@store';
import { Order, OrderStatus } from '@types';
import { alert, handleErrorFeedback, stopLoading } from '@utils';

import { api } from './api.service';
import { OrderApiResponse, OrderListApiResponse } from './ApiResponse.types';

/**
 * places order and resets cart on success
 * @param dispatch store dispatch
 */
export const placeOrder = async (dispatch: AppDispatch) => {
    try {
        const state = store.getState();

        const cartItems = state.cart.cartItems;
        const restaurant = state.restaurantDetails.restaurant;

        if (!restaurant || cartItems.length === 0) {
            alert(
                'error',
                'Cart is empty or restaurant is not selected',
                dispatch,
            );
            return;
        }

        await api.post('/orders', {
            restaurant_id: restaurant.id,
            items: cartItems.map((item) => ({
                menu_item_id: item.id,
                quantity: item.quantity,
            })),
        });

        alert('success', 'Order has been placed successfully', dispatch);
        dispatch(clearCart());
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

const mapOrderFromApi = (order: OrderApiResponse): Order => ({
    id: order.id,
    date: order.created_at,
    totalAmount: Number(order.grand_total),
    status: order.status,
    items: order.items.map((item) => ({
        id: item.id,
        name: item.dish_name,
        quantity: item.quantity,
        price: Number(item.price),
    })),
});
/**
 * get list of all orders
 * @param dispatch dispatch store
 */
export const getOrders = async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.get<OrderListApiResponse>('/orders', {
            params: { size: 100 },
        });

        dispatch(setOrders(data.items.map(mapOrderFromApi)));
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    } finally {
        stopLoading(dispatch);
    }
};

/**
 * status change of the order
 * @param orderId id of the order
 * @param nextStatus next status
 * @param dispatch dispatch store
 */
export const updateOrder = async (
    orderId: string,
    nextStatus: OrderStatus,
    dispatch: AppDispatch,
) => {
    try {
        await api.patch(`/orders/${orderId}/status`, {
            status: nextStatus,
        });

        dispatch(
            updateOrderState({
                orderId,
                nextStatus,
            }),
        );
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};
