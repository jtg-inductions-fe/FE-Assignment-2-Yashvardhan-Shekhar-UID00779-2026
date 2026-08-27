import { AppDispatch, clearCart } from '@store';
import { alert, delay } from '@utils';

export const placeOrder = async (dispatch: AppDispatch) => {
    await delay(2000);
    dispatch(clearCart());
    alert('success', 'Order has been places successfully', dispatch);
};
