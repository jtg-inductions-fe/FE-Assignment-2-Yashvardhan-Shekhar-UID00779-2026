/**
 * @type { email: string; password: string; } Login Inputs.
 */
export type LoginInput = {
    email: string;
    password: string;
};

export type LoginProp = {
    onSwitchToSignUp: () => void;
};
