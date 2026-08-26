// an authenticated user's basic information.
export type User = {
    id?: string;
    email: string;
    name: string;
    role: 'owner' | 'customer';
};
