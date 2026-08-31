import { MenuItem } from './restaurant.types';

/**
 * Represents an item stored in the shopping cart.
 */
export type CartItem = MenuItem & {
    /** quantity of the item */
    quantity: number;
};

export type OrderStatus =
    | 'pending'
    | 'accepted'
    | 'preparing'
    | 'out_for_delivery'
    | 'delivered'
    | 'rejected';

export type OrderItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
};

export type Order = {
    id: string;
    date: string;
    totalAmount: number;
    status: OrderStatus;
    items: OrderItem[];
};
