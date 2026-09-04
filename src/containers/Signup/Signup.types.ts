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
