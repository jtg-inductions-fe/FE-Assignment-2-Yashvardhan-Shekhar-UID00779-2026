import { Restaurant } from '@types';

/** restaurant Form dialog Prop */
export type RestaurantFormDialogProps = {
    /** restaurant object */
    restaurant: Restaurant;
    /** handleClose function */
    handleClose: () => void;
    /** state of processing */
    isProcessing: boolean;
    /** state of dialog true for open */
    isOpen: boolean;
    /** function to handle edit change of the restaurant */
    handleEditRestaurant: (data: Restaurant) => Promise<void>;
    /** function to handle delete change of the restaurant */
    handleCreateRestaurant: (data: Restaurant) => Promise<void>;
};

/** for input using veg/non veg */
export type RestaurantInput = Omit<Restaurant, 'isVeg'> & {
    /** veg or non-veg */
    isVeg: 'veg' | 'non-veg';
};
