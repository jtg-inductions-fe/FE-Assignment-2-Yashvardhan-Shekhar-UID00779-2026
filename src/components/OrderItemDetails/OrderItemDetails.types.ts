import { Order, OrderStatus } from '@types';

export type OrderItemDetailsProps = {
    order: Order;
    isOwnerView: boolean;
    onStatusChange: (orderId: string, nextStatus: OrderStatus) => void;
};
