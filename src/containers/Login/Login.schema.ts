import { z } from 'zod';

/**
 * Zod validation schema for user login form data.
 * Validates the user's email, password
 */
export const LoginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});
