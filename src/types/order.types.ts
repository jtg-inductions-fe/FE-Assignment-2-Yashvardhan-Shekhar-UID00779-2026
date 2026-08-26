import { MenuItem } from './restaurant.types';

/**
 * Represents an item stored in the shopping cart.
 */
export type CartItem = MenuItem & {
    /** quantity of the item */
    quantity: number;
};
