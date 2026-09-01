import { OrderStatus } from '@types';

import { STAGES } from './OrderItemDetails.config';

/**
 * returns color according to the given state
 * @param status {OrderStatus}
 * @returns Mui color
 */
export const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'pending':
            return 'warning';
        case 'accepted':
        case 'preparing':
            return 'info';
        case 'out_for_delivery':
            return 'secondary';
        case 'delivered':
            return 'success';
        case 'rejected':
            return 'error';
        default:
            return 'default';
    }
};

/**
 * returns number of valid or active count for stepper
 * @param status gets order status
 * @returns count/index of status
 */
export const getActiveStep = (status: OrderStatus) =>
    STAGES.findIndex((s) => s.value === status);
