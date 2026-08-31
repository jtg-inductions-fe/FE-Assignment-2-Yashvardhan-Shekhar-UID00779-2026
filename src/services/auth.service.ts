import { AppDispatch, updateUser } from '@store';
import { User } from '@types';
import { alert, handleErrorFeedback } from '@utils';

import { LoginType, SignupType } from './auth.types';

/**
 * Registers a new user, stores their information locally and updates the Redux user state
 *
 * @param {SignupType} user - User registration details
 * @param {AppDispatch} dispatch - Redux dispatch function used to update the user state and display feedback
 * @returns {Promise<void>} returns nothing
 * @throws Handles errors
 */
export const signUp = async (
    user: SignupType,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // replace this block with actual api
        const res = await fetch('data/Users.json');
        const data = (await res.json()) as User[];
        const userInfo = data[0];
        userInfo.role = user.role;

        // storing data into local storage
        localStorage.setItem('user', JSON.stringify(userInfo));

        // Update the Redux user state.
        dispatch(updateUser(userInfo));

        // Display a success message after account creation.
        alert('success', 'Your account has been created.', dispatch);
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Authenticates a user using their email and password stores their information locally, and updates the Redux user state
 *
 * @param {LoginType} user - User login credentials.
 * @param {AppDispatch} dispatch - Redux dispatch function used to update the user state and display feedback.
 * @returns {Promise<void>} returns nothing
 * @throws Handles errors
 */
export const login = async (
    user: LoginType,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // replace this block with actual api
        const res = await fetch('data/users.json');
        const data = (await res.json()) as User[];

        if (data[0].email !== user.email && data[1].email !== user.email) {
            throw new Error('Invalid email or password');
        }
        const userInfo = data[0].email === user.email ? data[0] : data[1];

        // storing data into local storage
        localStorage.setItem('user', JSON.stringify(userInfo));

        // Display a success message after authentication.
        alert('success', 'Logged in successfully.', dispatch);

        // Update the Redux user state.
        dispatch(updateUser(userInfo));
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

/**
 * Logs out the current user by clearing the Redux user state and removing stored user information from local storage
 *
 * @param {AppDispatch} dispatch - Redux dispatch function used to update the user state and display feedback.
 * @returns {void} No value is returned.
 */
export const logout = (dispatch: AppDispatch): void => {
    // Update the Redux user state.
    dispatch(updateUser(null));

    // Remove the stored information.
    localStorage.removeItem('user');

    // Display a success message after logout.
    alert('success', 'Logged out successfully.', dispatch);
};
