import { AppDispatch } from '@store';
import { Coupon } from '@types';
import { alert, handleErrorFeedback, stopLoading } from '@utils';

import { api } from './api.service';
/**
 * fetches coupons for a restaurant
 * @param restaurantId restaurant id
 * @param dispatch dispatch store
 */
export const getCoupons = async (
    restaurantId: string,
    dispatch: AppDispatch,
): Promise<Coupon[] | null> => {
    try {
        const { data } = await api.get<Coupon[]>(
            `/restaurants/${restaurantId}/coupons`,
        );

        return data;
    } catch (e) {
        handleErrorFeedback(e, dispatch);
        return null;
    } finally {
        stopLoading(dispatch);
    }
};

/**
 * creates a coupon for a restaurant
 * @param restaurantId restaurant id
 * @param data coupon data
 * @param dispatch dispatch store
 */
export const createCouponService = async (
    restaurantId: string,
    data: Coupon,
    dispatch: AppDispatch,
): Promise<Coupon | null> => {
    try {
        
        const { id, ...payload } = data;

        const response = await api.post<Coupon>(
            `/restaurants/${restaurantId}/coupons`,
            payload,
        );

        alert('success', 'Coupon created successfully', dispatch);
        return response.data;
    } catch (e) {
        handleErrorFeedback(e, dispatch);
        return null;
    }
};

/**
 * edits a coupon
 * @param restaurantId restaurant id
 * @param couponId coupon id
 * @param data coupon data
 * @param dispatch dispatch store
 */
export const editCouponService = async (
    restaurantId: string,
    data: Coupon,
    dispatch: AppDispatch,
): Promise<Coupon | null> => {
    try {
        const { id, ...payload } = data
        
        const response = await api.patch<Coupon>(
            `/restaurants/${restaurantId}/coupons/${id}`,
            payload,
        );

        alert('success', 'Coupon updated successfully', dispatch);
        return response.data;
    } catch (e) {
        handleErrorFeedback(e, dispatch);
        return null;
    }
};
