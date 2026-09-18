import { describe, expect, it } from 'vitest'
import { checkoutSchema } from './schema'

describe('CheckoutSchema', () => {
    it('accepts valid cash on delivery checkout', () => {
        const result = checkoutSchema.safeParse({
            name: 'John Doe',
            email: 'VtK4t@example.com',
            phone: '+79923452678',
            address: '123 Main St',
            city: 'Anytown',
            zip: '12345',
            country: 'US',
            payment: {
                paymentMethod: 'cashondelivery',
            },
        })

        expect(result.success).toBe(true)
    })

    it('accepts valid e-money checkout', () => {
        const result = checkoutSchema.safeParse({
            name: 'John Doe',
            email: 'VtK4t@example.com',
            phone: '+79923452678',
            address: '123 Main St',
            city: 'Anytown',
            zip: '12345',
            country: 'US',
            payment: {
                paymentMethod: 'emoney',
                eMoneyNumber: '123456789',
                eMoneyPin: '1234',
            },
        })

        expect(result.success).toBe(true)
    })

    it('rejects checkout without payment method', () => {
        const result = checkoutSchema.safeParse({
            name: 'John Doe',
            email: 'VtK4t@example.com',
            phone: '+79923452678',
            address: '123 Main St',
            city: 'Anytown',
            zip: '12345',
            country: 'US',
        })

        expect(result.success).toBe(false)
    })

    it('rejects e-money without e-money number', () => {
        const result = checkoutSchema.safeParse({
            name: 'John Doe',
            email: 'VtK4t@example.com',
            phone: '+79923452678',
            address: '123 Main St',
            city: 'Anytown',
            zip: '12345',
            country: 'US',
            payment: {
                paymentMethod: 'emoney',
                eMoneyPin: '1234',
            },
        })

        expect(result.success).toBe(false)
    })

    it('rejects e-money without e-money pin', () => {
        const result = checkoutSchema.safeParse({
            name: 'John Doe',
            email: 'VtK4t@example.com',
            phone: '+79923452678',
            address: '123 Main St',
            city: 'Anytown',
            zip: '12345',
            country: 'US',
            payment: {
                paymentMethod: 'emoney',
                eMoneyNumber: '123456789',
            },
        })

        expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
        const result = checkoutSchema.safeParse({
            name: 'John Doe',
            email: 'invalid-email',
            phone: '+79923452678',
            address: '123 Main St',
            city: 'Anytown',
            zip: '12345',
            country: 'US',
            payment: {
                paymentMethod: 'emoney',
                eMoneyNumber: '123456789',
                eMoneyPin: '1234',
            },
        })

        expect(result.success).toBe(false)
    })

    it('rejects invalid phone number', () => {
        const result = checkoutSchema.safeParse({
            name: 'John Doe',
            email: 'VtK4t@example.com',
            phone: 'invalid-phone-number',
            address: '123 Main St',
            city: 'Anytown',
            zip: '12345',
            country: 'US',
            payment: {
                paymentMethod: 'emoney',
                eMoneyNumber: '123456789',
                eMoneyPin: '1234',
            },
        })

        expect(result.success).toBe(false)
    })
})