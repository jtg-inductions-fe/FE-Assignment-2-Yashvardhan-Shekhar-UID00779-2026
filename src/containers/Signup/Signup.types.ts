import { User } from '@types';
/**
 * @type { email: string; password: string; } Signup Inputs.
 */
export type SignupInput = User & {
    confirmPassword: string;
    password: string;
};
/**
 * @type {
 *     onSwitchToLogin: () => void;
 * };
 */
export type SignupProp = {
    onSwitchToLogin: () => void;
};
