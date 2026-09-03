/**
 * Login Inputs.
 */
export type LoginInput = {
    /** email of the user */
    email: string;
    /** password of the user */
    password: string;
};
/**
 * props for a function to switch this method
 */
export type LoginProp = {
    onSwitchToSignUp: () => void;
};
