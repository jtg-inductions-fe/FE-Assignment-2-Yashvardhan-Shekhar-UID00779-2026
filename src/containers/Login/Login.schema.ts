import * as z from 'zod';

// schema for zod
export const schema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});
