/**
 * Represents the basic information of an authenticated user.
 * @type {
 *     id?: string;
 *     email: string;
 *     name: string;
 *     role: 'owner' | 'customer';
 * };
 *
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
