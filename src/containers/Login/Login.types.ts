/**
 * Login Inputs.
 */
export type LoginInput = {
    email: string;
    password: string;
};
/**
 * props for a function to switch this method
 */
export type LoginProp = {
    onSwitchToSignUp: () => void;
};
