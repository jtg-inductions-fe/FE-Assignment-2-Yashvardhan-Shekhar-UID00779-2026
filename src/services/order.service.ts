import { AppDispatch, clearCart } from '@store';
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

export const getOrders = async () => {
    const data = await fetch('src/data/orders.json');
    return data;
};
