import { store } from '@store';
import { CartItem, Restaurant, RestaurantDetails } from '@types';

/** Represents the complete Redux store state. */
export type RootState = ReturnType<typeof store.getState>;

/** Represents the Redux store's dispatch function. */
export type AppDispatch = typeof store.dispatch;

/** Represents the type of the Redux store instance. */
export type AppStore = typeof store;

/**
 * Represents the state of the restaurants.
 */
export type RestaurantState = {
    restaurants: Restaurant[];
};

/**
 * Represents the state of the shopping cart.
 */
export type CartState = {
    cartItems: CartItem[];
};

/**
 * @type {
 *     restaurant: RestaurantDetails | null;
 * }
 */
export type RestaurantDetailsState = {
    restaurant: RestaurantDetails | null;
};
