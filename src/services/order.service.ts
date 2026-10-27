import { NavigateFunction } from 'react-router';

import { FETCH_LIMIT, PATH } from '@constant';
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
import {
    CheckoutPreviewResponse,
    OrderApiResponse,
    OrderListApiResponse,
} from './ApiResponse.types';

export const checkoutPreview = async (
    couponCode: string | null,
    dispatch: AppDispatch,
): Promise<CheckoutPreviewResponse | null> => {
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
            return null;
        }

        const { data } = await api.post<CheckoutPreviewResponse>(
            '/orders/checkout-preview',
            {
                restaurant_id: restaurant.id,
                items: cartItems.map((item) => ({
                    menu_item_id: item.id,
                    quantity: item.quantity,
                })),
                coupon_code: couponCode?.trim() || null,
            },
        );

        return data;
    } catch (e) {
        handleErrorFeedback(e, dispatch);
        return null;
    }
};

/**
 * places order and resets cart on success
 * @param dispatch store dispatch
 */
export const placeOrder = async (
    dispatch: AppDispatch,
    couponCode: string,
    navigate: NavigateFunction,
) => {
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
            coupon_code: Boolean(couponCode) ? couponCode : null,
            items: cartItems.map((item) => ({
                menu_item_id: item.id,
                quantity: item.quantity,
            })),
        });

        alert('success', 'Order has been placed successfully', dispatch);

        await navigate(PATH.ORDERS);
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
export const getOrders = async (
    dispatch: AppDispatch,
    cursor?: string | null,
): Promise<string | null> => {
    try {
        const { data } = await api.get<OrderListApiResponse>('/orders', {
            params: {
                size: FETCH_LIMIT,
                ...(cursor ? { cursor } : {}),
            },
        });

        const orders = data.items.map(mapOrderFromApi);

        if (cursor) {
            orders.forEach((order) => {
                dispatch(
                    setOrders([
                        ...(store.getState().orders.orders as Order[]),
                        order,
                    ]),
                );
            });
        } else {
            dispatch(setOrders(orders));
        }

        return data.next_page;
    } catch (e) {
        handleErrorFeedback(e, dispatch);
        return null;
    } finally {
        if (!cursor) {
            stopLoading(dispatch);
        }
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
