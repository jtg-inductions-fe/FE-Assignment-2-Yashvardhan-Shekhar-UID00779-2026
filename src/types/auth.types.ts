/**
 * Represents the basic information of an authenticated user.
 */
export type User = {
    /** id of the user */
    id?: string;
    /** email of the user */
    email: string;
    /** name of the user */
    name: string;
    /** role of user owner/customer */
    role: 'owner' | 'customer';
};
