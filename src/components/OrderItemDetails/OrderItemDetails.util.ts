import {
    CancelOutlined,
    CheckCircleOutline,
    DeliveryDiningOutlined,
    HourglassEmpty,
    Inventory2Outlined,
    RestaurantOutlined,
} from '@mui/icons-material';

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

/**
 * returns status
 * @param status gets order status
 * @returns string removed _ from the status
 */
export const getStatus = (status: OrderStatus) =>
    status === 'out_for_delivery' ? 'out for delivery' : status;

/**
 * get icon according to status of the order
 * @param status status of order
 * @returns Mui Icon component
 */
export const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
        case 'pending':
            return HourglassEmpty;
        case 'accepted':
            return CheckCircleOutline;
        case 'preparing':
            return RestaurantOutlined;
        case 'out_for_delivery':
            return DeliveryDiningOutlined;
        case 'delivered':
            return Inventory2Outlined;
        case 'rejected':
            return CancelOutlined;
    }
};
