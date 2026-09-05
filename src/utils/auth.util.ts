import { NavigateFunction } from 'react-router';

import { PATH } from '@constant';
import { AppDispatch, stopStartupLoading, updateUser } from '@store';
import { User } from '@types';
import { alert, delay, handleErrorFeedback, stopLoading } from '@utils';

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
                await navigate(PATH.HOME);
            }
        } else {
            if (!isOnAuthPage) {
                await navigate(PATH.LOGIN);
                alert(
                    'warning',
                    'It seem that you have been logged out',
                    dispatch,
                );
            }
            stopLoading(dispatch);
        }
    } catch (error) {
        handleErrorFeedback(error, dispatch);
        localStorage.removeItem('users');
        await navigate(PATH.LOGIN);
    } finally {
        dispatch(stopStartupLoading());
    }
};
