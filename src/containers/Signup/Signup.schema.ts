import * as z from 'zod';

/**
 * Zod validation schema for user signup form data.
 *
 * Validates the user's name, email, password, password confirmation,
 * and account role, including matching password confirmation.
 */
export const schema = z
    .object({
        name: z
            .string()
            .min(1, 'Name is required')
            .min(3, 'Name must be at least 3 characters'),

        email: z.email('Invalid email address'),

        password: z
            .string()
            .min(1, 'Password is required')
            .min(6, 'Password must be at least 6 characters'),

        confirmPassword: z.string().min(1, 'Please confirm your password'),

        role: z.literal(['owner', 'customer']),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
