import { User } from '@types';
/**
 *  Signup Inputs.
 */
export type SignupInput = User & {
    /** password */
    password: string;
    /** confirm password */
    confirmPassword: string;
};
/**
 * props for the component function to switch
 */
export type SignupProp = {
    onSwitchToLogin: () => void;
};
