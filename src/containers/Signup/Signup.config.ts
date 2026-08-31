import { z } from 'zod';

/**
 * Zod validation schema for user signup form data.
 *
 * Validates the user's name, email, password, password confirmation,
 * and account role, including matching password confirmation.
 */
export const SignupSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Name is required')
            .min(3, 'Name must be at least 3 characters'),

        email: z.email('Invalid email address'),

        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, { message: 'Password should have minimum length of 8' })
            .regex(/^(?=.*[A-Z]).{8,}$/, {
                message:
                    'Should Contain at least one uppercase letter and have a minimum length of 8 characters.',
            }),

        confirmPassword: z.string().min(1, 'Please confirm your password'),

        role: z.enum(['owner', 'customer']),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
