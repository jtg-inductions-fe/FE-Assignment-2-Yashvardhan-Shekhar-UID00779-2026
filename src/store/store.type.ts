import { store } from '@store';
import { CartItem, Order, Restaurant, RestaurantDetails } from '@types';

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
    restaurants: Restaurant[] | null;
};

/**
 * Represents the state of the shopping cart.
 */
export type CartState = {
    cartItems: CartItem[];
};

/** details of the restaurant */
export type RestaurantDetailsState = {
    /**object of complete restaurant */
    restaurant: RestaurantDetails | null;
};

/** order state for the store  */
export type OrderState = {
    /**orders list */
    orders: Order[] | null;
};
