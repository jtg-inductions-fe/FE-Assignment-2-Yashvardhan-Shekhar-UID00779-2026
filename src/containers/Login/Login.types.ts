/**
 * @type { email: string; password: string; } Login Inputs.
 */
export type LoginInput = {
    email: string;
    password: string;
};
/**
 * to switch this method
 * @type {
 *     onSwitchToSignUp: () => void;
 * };
 */
export type LoginProp = {
    onSwitchToSignUp: () => void;
};
