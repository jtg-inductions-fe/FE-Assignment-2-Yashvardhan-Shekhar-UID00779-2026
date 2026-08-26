import { AppDispatch, updateUser } from '@store';
import { User } from '@types';
import { alert, getHashedPassword } from '@utils';

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
    // Generate a unique ID for the new user.
    user.id = crypto.randomUUID();

    // Hash the user's password before storing it.
    user.password = await getHashedPassword(user.password);

    // Retrieve all registered users from local storage.
    const str = localStorage.getItem('allUsers') || '[]';
    const users = (await JSON.parse(str)) as SignupType[];

    // Add the new user to the list of registered users.
    users.push(user);
    localStorage.setItem('allUsers', JSON.stringify(users));

    // Remove sensitive fields before storing the current user.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, ...userInfo } = { ...user };

    localStorage.setItem('user', JSON.stringify(userInfo));

    // Update the Redux user state.
    dispatch(updateUser(userInfo));

    // Display a success message after account creation.
    alert('success', 'Your account has been created.', dispatch);
};

// Authenticate a user using their email and password.
export const login = async (
    user: LoginType,
    dispatch: AppDispatch,
): Promise<void> => {
    // Hash the provided password for comparison.
    user.password = await getHashedPassword(user.password);

    // Retrieve all registered users from local storage.
    const str = localStorage.getItem('allUsers') || '[]';
    const users = (await JSON.parse(str)) as SignupType[];

    // Find a registered user matching the provided credentials.
    for (const u of users) {
        if (u.email === user.email && u.password === user.password) {
            // Remove sensitive fields before storing the current user.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, confirmPassword, ...userInfo } = { ...u };

            localStorage.setItem('user', JSON.stringify(userInfo));

            // Update the Redux user state.
            dispatch(updateUser(userInfo));

            // Display a success message after authentication.
            alert('success', 'Logged in successfully.', dispatch);
            return;
        }
    }

    // Display an error message for invalid credentials.
    alert('error', 'Incorrect email id or password', dispatch);
};

// Log out the current user and clear their stored information.
export const logout = (dispatch: AppDispatch) => {
    // Update the Redux user state.
    dispatch(updateUser(null));

    // Remove the stored user information.
    localStorage.removeItem('user');

    // Display a success message after logout.
    alert('success', 'Logged out successfully.', dispatch);
};
