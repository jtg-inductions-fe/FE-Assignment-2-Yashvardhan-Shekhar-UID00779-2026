import { Restaurant } from '@types';

/**
 * @type {
 *    restaurant: Restaurant;
 *    handleClose: () => void;
 *    isProcessing: boolean;
 *    isOpen: boolean;
 *    handleEditRestaurant: (data: Restaurant) => Promise<void>;
 *    handleCreateRestaurant: (data: Restaurant) => Promise<void>;
 * };
 */

export type RestaurantFormDialogProps = {
    restaurant: Restaurant;
    handleClose: () => void;
    isProcessing: boolean;
    isOpen: boolean;
    handleEditRestaurant: (data: Restaurant) => Promise<void>;
    handleCreateRestaurant: (data: Restaurant) => Promise<void>;
};

/**
 * for input using veg/non veg
 * @type {
 *     isVeg: 'veg' | 'non-veg'
 * }
 */
export type RestaurantInput = Omit<Restaurant, 'isVeg'> & {
    isVeg: 'veg' | 'non-veg';
};
