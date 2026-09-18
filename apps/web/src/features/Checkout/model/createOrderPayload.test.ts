import { describe, it, expect } from 'vitest'
import { createOrderPayload } from './createOrderPayload'
import type { CheckoutSchema } from '@/entities/checkout/model/types'
import type { CartItem } from '@/entities/cart/model/types'

describe('createOrderPayload', () => {
    it('creates payload from checkout data and cart items', () => {
        const data: CheckoutSchema = {
            name: 'John Doe',
            email: '6V9t2@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'United States',
            payment: { paymentMethod: 'cashondelivery' },
        }

        const items: CartItem[] = [
            {
                id: '1',
                slug: 'product-1',
                category: 'headphones',
                image: 'product-1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 2,
                stock: 100,
            }
        ]

        const result = createOrderPayload(data, items)

        expect(result).toEqual({
            name: 'John Doe',
            email: '6V9t2@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'United States',
            paymentMethod: 'CASH_ON_DELIVERY',
            items: [
                {
                    productId: '1',
                    quantity: 2
                },
            ],
        })
    })

    it('maps emoney payment method to E_MONEY', () => {
        const data: CheckoutSchema = {
            name: 'John Doe',
            email: '6V9t2@example.com',
            phone: '+1 234 567890',
            address: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'United States',
            payment: {
                paymentMethod: 'emoney',
                eMoneyNumber: '123456789',
                eMoneyPin: '1234',
            },
        }

        const items: CartItem[] = [
            {
                id: '1',
                slug: 'product-1',
                category: 'headphones',
                image: 'product-1.jpg',
                shortTitle: 'Product 1',
                price: 500,
                quantity: 2,
                stock: 400,
            }
        ]

        const result = createOrderPayload(data, items)

        expect(result).toEqual({
            name: 'John Doe',
            email: '6V9t2@example.com',
            phone: '+1 234 567890',
            address: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'United States',
            paymentMethod: 'E_MONEY',
            items: [
                {
                    productId: '1',
                    quantity: 2
                },
            ],
        })
    })

    it('maps multiple cart items', () => {
        const data: CheckoutSchema = {
            name: 'John Doe',
            email: '6V9t2@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'United States',
            payment: { paymentMethod: 'cashondelivery' },
        }

        const items: CartItem[] = [
            {
                id: '1',
                slug: 'product-1',
                category: 'headphones',
                image: 'product-1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 2,
                stock: 100,
            },
            {
                id: '2',
                slug: 'product-2',
                category: 'headphones',
                image: 'product-2.jpg',
                shortTitle: 'Product 2',
                price: 200,
                quantity: 1,
                stock: 100,
            },
        ]

        const result = createOrderPayload(data, items)

        expect(result).toEqual({
            name: 'John Doe',
            email: '6V9t2@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'United States',
            paymentMethod: 'CASH_ON_DELIVERY',
            items: [
                {
                    productId: '1',
                    quantity: 2
                },
                {
                    productId: '2',
                    quantity: 1
                },
            ],
        })
    })

    it('creates empty items array', () => {
        const data: CheckoutSchema = {
            name: 'John Doe',
            email: '6V9t2@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'United States',
            payment: { paymentMethod: 'cashondelivery' },
        }

        const result = createOrderPayload(data, [])

        expect(result.items).toEqual([])
    })
})