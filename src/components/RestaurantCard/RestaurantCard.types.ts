import { NavigateFunction } from 'react-router';

import { Restaurant } from '@types';

export type RestaurantCardProps = {
    restaurant: Restaurant;
    isOwnerView: boolean;
    navigate: NavigateFunction;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};
