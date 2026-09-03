import { NavigateFunction } from 'react-router';

import { AppDispatch, updateUser } from '@store';
import { User } from '@types';
import { alert, handleErrorFeedback } from '@utils';

/**
 * handle user state for route protection
 * @param dispatch store dispatch
 * @param navigate navigate to redirect in case used does not exists
 */
export const handleUser = (
    dispatch: AppDispatch,
    navigate: NavigateFunction,
) => {
    try {
        const user = JSON.parse(localStorage.getItem('user') || 'null') as User;

        const isPresent =
            user && user.name && user.email && user.role && user.id;

        if (isPresent) {
            dispatch(updateUser(user));
        } else {
            alert('warning', 'your account has been logged out', dispatch);
            void navigate('/login');
        }
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};
