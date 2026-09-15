import { OrderStatus } from '@types';

export const STAGES: { label: string; value: OrderStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Preparing', value: 'preparing' },
    { label: 'Out for Delivery', value: 'out_for_delivery' },
    { label: 'Delivered', value: 'delivered' },
];
