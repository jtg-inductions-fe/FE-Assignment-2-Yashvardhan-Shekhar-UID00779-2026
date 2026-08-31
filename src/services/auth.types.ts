import { User } from '@types';

/**
 * Represents the data required to register a new user.
 *
 * @type {User & {
 *     password: string;
 *     confirmPassword: string;
 * }} SignupType
 */
export type SignupType = User & {
    password: string;
    confirmPassword: string;
};

/**
 * Represents the credentials required to authenticate a user.
 *
 * @type {{
 *     email: string;
 *     password: string;
 * }} LoginType
 */
export type LoginType = {
    email: string;
    password: string;
};
