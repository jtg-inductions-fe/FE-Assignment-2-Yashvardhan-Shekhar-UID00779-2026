export { alert, handleErrorFeedback } from './feedback.util';
export { handleUser } from './auth.util';
export {
    formatTime,
    handleCreateRestaurant,
    handleEditRestaurant,
    handleDeleteRestaurant,
} from './restaurants.util';

export { formatTime, getRestaurants } from './restaurants.util';
export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
export { alert, handleErrorFeedback, delay } from './feedback.util';
export { formatTime } from './restaurants.util';
