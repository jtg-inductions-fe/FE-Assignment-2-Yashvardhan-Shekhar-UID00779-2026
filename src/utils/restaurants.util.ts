import mockRestaurants from '@data/mockRestaurants.json';
import { Restaurant } from '@types';

// restaurantUtils.ts
export const getRestaurants = () => mockRestaurants as Restaurant[];

export const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};
