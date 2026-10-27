import { MenuItem } from './restaurant.types';

/**
 * Represents an item stored in the shopping cart.
 */
export type CartItem = MenuItem & {
    /** quantity of the item */
    quantity: number;
};

/**
 * status of the order
 */
export type OrderStatus =
    | 'pending'
    | 'accepted'
    | 'preparing'
    | 'out_for_delivery'
    | 'delivered'
    | 'rejected';

/**
 * Represents an item in an order.
 */
export type OrderItem = {
    /** unique id of the item */
    id: string;
    /** name of the item */
    name: string;
    /** quantity of the item */
    quantity: number;
    /** price of the item */
    price: number;
};

/**
 * Represents an order.
 */
export type Order = {
    /** unique id of the order */
    id: string;
    /** date of the order */
    date: string;
    /** total amount of the order */
    totalAmount: number;
    /** current status of the order */
    status: OrderStatus;
    /** items included in the order */
    items: OrderItem[];
};
