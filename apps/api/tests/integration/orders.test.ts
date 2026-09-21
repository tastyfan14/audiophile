import { describe, expect, it } from 'vitest'
import app from '../../src/app'
import request from 'supertest'

describe('Orders API', () => {
    it('POST /api/checkout/create creates an order', async () => {
        const productResponse = await request(app).get('/api/products/headphones')

        const product = productResponse.body[0]

        const response = await request(app)
            .post('/api/checkout/create')
            .send({
                name: 'Test User',
                email: '0A2H9@example.com',
                phone: '+1234567890',
                address: 'test address',
                city: 'test city',
                country: 'test country',
                zip: '12345',
                paymentMethod: 'CASH_ON_DELIVERY',
                items: [{ productId: product.id, quantity: 1 }],
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('status')
        expect(response.body).toHaveProperty('grandTotal')
        expect(response.body.items).toHaveLength(1)
        expect(response.body.items[0]).toHaveProperty('productId', product.id)
    })

    it('POST /api/checkout/create returns 404 when products does not exist', async () => {
        const response = await request(app)
            .post('/api/checkout/create')
            .send({
                name: 'Test User',
                email: '0A2H9@example.com',
                phone: '+1234567890',
                address: 'test address',
                city: 'test city',
                country: 'test country',
                zip: '12345',
                paymentMethod: 'CASH_ON_DELIVERY',
                items: [{ productId: 'not-existing-product', quantity: 1 }],
            })

        expect(response.status).toBe(404)
        expect(response.body.message).toContain('not found')
    })

    it('POST /api/checkout/create returns 409 when stock is not enough', async () => {
        const productResponse = await request(app).get('/api/products/headphones')

        const product = productResponse.body[0]

        const response = await request(app)
            .post('/api/checkout/create')
            .send({
                name: 'Test User',
                email: '0A2H9@example.com',
                phone: '+1234567890',
                address: 'test address',
                city: 'test city',
                country: 'test country',
                zip: '12345',
                paymentMethod: 'CASH_ON_DELIVERY',
                items: [{ productId: product.id, quantity: product.stock + 1 }],
            })

        expect(response.status).toBe(409)
        expect(response.body.message).toContain('Not enough stock')
    })

    it('POST /api/checkout/create', async () => {
        const response = await request(app)
            .post('/api/checkout/create')
            .send({
                name: 'Test User',
                email: '0A2H9@example.com',
                phone: '+1234567890',
                address: 'test address',
                city: 'test city',
                country: 'test country',
                zip: '12345',
                paymentMethod: 'CASH_ON_DELIVERY',
                items: [],
            })

        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'Invalid order data' })
    })
})