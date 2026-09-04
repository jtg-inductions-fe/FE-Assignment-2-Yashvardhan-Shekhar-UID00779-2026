import { User } from '@types';

/**
 * Represents the data required to register a new user
 */
export type SignupType = User & {
    /** password of the Signup Input */
    password: string;
    /** confirmPassword of the Signup Input */
    confirmPassword: string;
};

/**
 * Represents the credentials required to authenticate a user.
 */
export type LoginType = {
    /** email of the Login Input */
    email: string;
    /** password of the Login Input */
    password: string;
};
