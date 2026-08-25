import { updateUser } from '@store';
import { AppDispatch, LoginInput, SignupInput } from '@types';
import { alert, getHashedPassword } from '@utils';

// Add an artificial delay for the specified duration.
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Register a new user and store their information locally.
export const signUp = async (
    user: SignupInput,
    dispatch: AppDispatch,
): Promise<void> => {
    await delay(2000);

    // Generate a unique ID for the new user.
    user.id = crypto.randomUUID();

    // Hash the user's password before storing it.
    user.password = await getHashedPassword(user.password);

    // Retrieve all registered users from local storage.
    const str = localStorage.getItem('allUsers') || '[]';
    const users = (await JSON.parse(str)) as SignupInput[];

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
    user: LoginInput,
    dispatch: AppDispatch,
): Promise<void> => {
    await delay(2000);

    // Hash the provided password for comparison.
    user.password = await getHashedPassword(user.password);

    // Retrieve all registered users from local storage.
    const str = localStorage.getItem('allUsers') || '[]';
    const users = (await JSON.parse(str)) as SignupInput[];

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
