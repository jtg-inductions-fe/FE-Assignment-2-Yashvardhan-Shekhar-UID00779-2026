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
