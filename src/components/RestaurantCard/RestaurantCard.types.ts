import { Restaurant } from '@types';

/** RestaurantCard props  */
export type RestaurantCardProps = {
    /** restaurant object */
    restaurant: Restaurant;
    /** true if user is owner */
    isOwnerView: boolean;
    /** pass id of targeted restaurant to edit */
    onEdit: (id: string) => void;
    /** pass id of targeted restaurant to delete */
    onDelete: (id: string) => void;
};
