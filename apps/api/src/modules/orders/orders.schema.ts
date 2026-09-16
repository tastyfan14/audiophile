import { z } from 'zod'

export const createOrderSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(50, 'Name must be less than 50 characters')
        .regex(
            /^[\p{L}]+(?:[ '-][\p{L}]+)+$/u,
            'Enter your first and last name',
        ),

    email: z
        .string()
        .trim()
        .email('Enter a valid email address')
        .max(254, 'Email must be less than 254 characters'),

    phone: z
        .string()
        .trim()
        .min(1, 'Phone number is required')
        .max(20, 'Phone number must be less than 20 characters'),

    address: z
        .string()
        .trim()
        .min(5, 'Address is required')
        .max(250, 'Address must be less than 250 characters'),

    city: z
        .string()
        .trim()
        .min(2, 'City is required')
        .max(100, 'City must be less than 100 characters'),

    zip: z
        .string()
        .trim()
        .min(3, 'Zip code is required')
        .max(12, 'Zip code must be less than 12 characters'),

    country: z
        .string()
        .trim()
        .min(2, 'Country is required')
        .max(100, 'Country must be less than 100 characters'),

    paymentMethod: z.enum([
        'E_MONEY',
        'CASH_ON_DELIVERY',
    ]),

    items: z
        .array(
            z.object({
                productId: z.string().min(1),
                quantity: z.number().int().positive(),
            }),
        )
        .min(1),
})

export type CreateOrderDto = z.infer<typeof createOrderSchema>