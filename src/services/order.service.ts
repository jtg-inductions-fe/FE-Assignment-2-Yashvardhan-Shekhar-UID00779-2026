import { AppDispatch, clearCart, setOrders, updateOrderState } from '@store';
import { Order, OrderStatus } from '@types';
import { alert, delay, handleErrorFeedback } from '@utils';

/**
 * places order and resets cart on success
 * @param dispatch store dispatch
 */
export const placeOrder = async (dispatch: AppDispatch) => {
    try {
        await delay();
        alert('success', 'Order has been placed successfully', dispatch);
        dispatch(clearCart());
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * get list of all orders
 * @param dispatch dispatch store
 */
export const getOrders = async (dispatch: AppDispatch) => {
    try {
        // api call will be replaced by this block
        const res = await fetch('data/orders.json');
        const data = (await res.json()) as Order[];
        dispatch(setOrders(data));
    } catch (e) {
        handleErrorFeedback(e, dispatch);
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
        // api call will be placed here
        await delay();
        dispatch(
            updateOrderState({ orderId: orderId, nextStatus: nextStatus }),
        );
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};
