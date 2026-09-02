import { User } from '@types';
/**
 *  Signup Inputs.
 */
export type SignupInput = User & {
    confirmPassword: string;
    password: string;
};
/**
 * props for the component function to switch
 */
export type SignupProp = {
    onSwitchToLogin: () => void;
};
