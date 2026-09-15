import { isValidPhoneNumber } from 'libphonenumber-js'
import z from 'zod'

export const checkoutSchema = z.object({
    // first section
    name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(50, 'Name must be less than 50 characters')
        .regex(/^[\p{L}]+(?:[ '-][\p{L}]+)+$/u, 'Enter your first and last name'),
    email: z
        .email('Enter a valid email address')
        .trim()
        .max(254, 'Email must be less than 254 characters'),
    phone: z
        .string()
        .trim()
        .min(1, 'Phone number is required')
        .refine(
            (phone) => isValidPhoneNumber(phone), {
                message: 'Enter a valid phone number',
            }
        ),

    // second section
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

    // third section
    payment: z
        .discriminatedUnion('paymentMethod', [
            z.object({
                paymentMethod: z.literal('emoney'),
                eMoneyNumber: z
                    .string()
                    .trim()
                    .min(1, 'Number is required')
                    .regex(/^\d+$/, 'E-Money number must contain only numbers'),
                eMoneyPin: z
                    .string()
                    .trim()
                    .min(1, 'Pin is required')
                    .regex(/^\d+$/, 'E-Money PIN must contain only numbers'),
            }),

            z.object({
                paymentMethod: z.literal('cashondelivery'),
            })
        ]),
})