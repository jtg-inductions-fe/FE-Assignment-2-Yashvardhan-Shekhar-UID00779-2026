export type { User, SignupInput, LoginInput } from './user.types';
export type { AppDispatch, RootState, AppStore } from './redux.types';

export type Severity = 'warning' | 'info' | 'success' | 'error' | null;

export type Alert = {
    severity: Severity;
    message: string;
};
