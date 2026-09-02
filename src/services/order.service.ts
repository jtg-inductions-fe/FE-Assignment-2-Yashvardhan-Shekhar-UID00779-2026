import { AppDispatch, clearCart } from '@store';
import { alert, delay } from '@utils';

export const placeOrder = async (dispatch: AppDispatch) => {
    await delay();
    alert('success', 'Order has been places successfully', dispatch);
    dispatch(clearCart());
};
