/**
 * Represents the basic information of an authenticated user.
 */
export type User = {
    id?: string;
    email: string;
    name: string;
    role: 'owner' | 'customer';
};
