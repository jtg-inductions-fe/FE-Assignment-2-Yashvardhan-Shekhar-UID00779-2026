export type { User } from './user.types';
export type { AppDispatch, RootState, AppStore } from './redux.types';
export type LoginInput = {
    email: string;
    password: string;
};

export type User = {
    id?: string;
    email: string;
    name: string;
    role: 'owner' | 'customer';
};

export type SignupInput = User &
    LoginInput & {
        confirmPassword: string;
    };

type Severity = 'warning' | 'info' | 'success' | 'error' | null;

export type Alert = {
    severity: Severity;
    message: string;
};
