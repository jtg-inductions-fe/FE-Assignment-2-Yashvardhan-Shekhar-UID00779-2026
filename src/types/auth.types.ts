// an authenticated user's basic information.

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
