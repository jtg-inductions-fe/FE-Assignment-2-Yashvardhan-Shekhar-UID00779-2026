import { NavigateFunction } from 'react-router';

import { PATH } from '@constant';
import { AppDispatch, updateUser } from '@store';
import { User } from '@types';
import { alert, delay, handleErrorFeedback } from '@utils';

/**
 * handle user state for route protection
 * @param dispatch store dispatch
 * @param navigate navigate to redirect in case used does not exists
 * @param isOnAuthPage true if calling from auth page
 */
export const navigateUserBasedOnState = async (
    dispatch: AppDispatch,
    navigate: NavigateFunction,
    isOnAuthPage: boolean,
) => {
    try {
        // replace with token verification
        await delay();

        const user = JSON.parse(localStorage.getItem('user') || 'null') as User;

        const isPresent =
            user && user.name && user.email && user.role && user.id;

        if (isPresent) {
            dispatch(updateUser(user));
            if (isOnAuthPage) {
                alert('info', 'You are already logged in', dispatch);
                void navigate(PATH.HOME);
            }
        } else {
            if (!isOnAuthPage) {
                alert('warning', 'Please Login', dispatch);
                void navigate(PATH.LOGIN);
            }
        }
    } catch (error) {
        handleErrorFeedback(error, dispatch);
    }
};
