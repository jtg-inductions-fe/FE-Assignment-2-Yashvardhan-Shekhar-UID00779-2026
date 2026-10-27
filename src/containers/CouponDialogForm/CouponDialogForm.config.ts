import { z } from 'zod';

/**
 * Zod validation schema for user Menu form data.
 */
export const CouponSchema = z.object({
    id: z.string(),
    code: z.string().min(1, 'Coupon Code is required'),
    state: z.string(),
    percentage: z
        .number()
        .min(1, 'Discount cannot be less than 1')
        .max(100, 'Discount cannot be more than 100'),
});

