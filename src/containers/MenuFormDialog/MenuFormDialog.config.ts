import { z } from 'zod';

/**
 * Zod validation schema for user Menu form data.
 */
export const MenuItemSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Dish Name is required'),
    description: z.string(),
    price: z.number().min(1, 'Price cannot be less than 1'),
    stock: z.number().min(0, 'Stock cannot be negative'),
    image: z.string(),
});
