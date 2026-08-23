import { dispatch, updateAlert } from 'store';
import { updateUser } from 'store';

import { LoginInput, SignupInput } from '@types';
import { getHashedPassword } from '@utils';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const signUp = async (user: SignupInput): Promise<void> => {
    await delay(2000);

    user.id = crypto.randomUUID();

    user.password = await getHashedPassword(user.password);

    const str = localStorage.getItem('allUsers') || '[]';
    const users = (await JSON.parse(str)) as SignupInput[];
    users.push(user);
    localStorage.setItem('allUsers', JSON.stringify(users));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, ...userInfo } = { ...user };

    localStorage.setItem('user', JSON.stringify(userInfo));

    dispatch(updateUser(userInfo));
    dispatch(
        updateAlert({
            severity: 'success',
            message: 'You account has been created.',
        }),
    );
};

export const login = async (user: LoginInput): Promise<void> => {
    await delay(2000);

    user.password = await getHashedPassword(user.password);
    const str = localStorage.getItem('allUsers') || '[]';
    const users = (await JSON.parse(str)) as SignupInput[];

    for (const u of users) {
        if (u.email === user.email && u.password === user.password) {
            dispatch(
                updateAlert({
                    severity: 'success',
                    message: 'Logged in successfully.',
                }),
            );

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, confirmPassword, ...userInfo } = { ...u };

            localStorage.setItem('user', JSON.stringify(userInfo));
            dispatch(updateUser(userInfo));
            return;
        }
    }

    dispatch(
        updateAlert({
            severity: 'error',
            message: 'Incorrect email id or password',
        }),
    );
};

export const logout = () => {
    dispatch(
        updateAlert({
            severity: 'success',
            message: 'Logged out successfully.',
        }),
    );
    dispatch(updateUser(null));
    localStorage.removeItem('user');
};
