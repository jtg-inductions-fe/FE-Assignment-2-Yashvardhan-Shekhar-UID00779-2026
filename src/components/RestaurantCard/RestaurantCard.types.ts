import { NavigateFunction } from 'react-router';

import { Restaurant } from '@types';

/**
 * @type {
 *    restaurant: Restaurant;
 *    isOwnerView: boolean;
 *    navigate: NavigateFunction;
 *    onEdit: (id: string) => void;
 *    onDelete: (id: string) => void;
 * };
 */

export type RestaurantCardProps = {
    restaurant: Restaurant;
    isOwnerView: boolean;
    navigate: NavigateFunction;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};
