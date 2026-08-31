import { User } from '@types';
/**
 * @type { email: string; password: string; } Signup Inputs.
 */
export type SignupInput = User & {
    confirmPassword: string;
    password: string;
};

export type SignupProp = {
    onSwitchToLogin: () => void;
};
