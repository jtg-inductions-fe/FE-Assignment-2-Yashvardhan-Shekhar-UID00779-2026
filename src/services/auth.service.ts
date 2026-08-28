import { AppDispatch, updateUser } from '@store';
import { User } from '@types';
import { alert, handleErrorFeedback } from '@utils';

type SignupType = User & {
    password: string;
    confirmPassword: string;
};

type LoginType = {
    email: string;
    password: string;
};

// Register a new user and store their information locally.
export const signUp = async (
    user: SignupType,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // replace this block with actual api
        const res = await fetch('src/data/Users.json');
        const userInfo = (await res.json()) as User;
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

// Authenticate a user using their email and password.
export const login = async (
    user: LoginType,
    dispatch: AppDispatch,
): Promise<void> => {
    try {
        // replace this block with actual api
        const res = await fetch('src/data/Users.json');
        const userInfo = (await res.json()) as User;
        userInfo.email = user.email;

        // storing data into local storage
        localStorage.setItem('user', JSON.stringify(userInfo));

        // Update the Redux user state.
        dispatch(updateUser(userInfo));

        // Display a success message after authentication.
        alert('success', 'Logged in successfully.', dispatch);
    } catch (e) {
        handleErrorFeedback(e, dispatch);
    }
};

// Log out the current user and clear their stored information.
export const logout = (dispatch: AppDispatch) => {
    // Update the Redux user state.
    dispatch(updateUser(null));

    // Remove the stored information.
    localStorage.clear();

    // Display a success message after logout.
    alert('success', 'Logged out successfully.', dispatch);
};
