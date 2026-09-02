import { User } from '@types';

/**
 * Represents the data required to register a new user
 */
export type SignupType = User & {
    password: string;
    confirmPassword: string;
};

/**
 * Represents the credentials required to authenticate a user.
 */
export type LoginType = {
    email: string;
    password: string;
};
