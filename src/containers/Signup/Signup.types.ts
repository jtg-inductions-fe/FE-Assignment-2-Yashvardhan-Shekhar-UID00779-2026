import { User } from '@types';

export type SignupInput = User & {
    confirmPassword: string;
    password: string;
};

export type SignupProp = {
    onSwitchToLogin: () => void;
};
