import { describe, expect, it } from 'vitest'
import request from 'supertest'
import app from '../../src/app'

describe('Products API', () => {
    it('GET /api/products/:category returns products', async () => {
        const response = await request(app).get('/api/products/headphones')

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body[0]).toHaveProperty('slug')
    })

    it('GET /api/products/:category/:slug returns product', async () => {
        const response = await request(app).get('/api/products/headphones/xx99-mark-two')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('slug', 'xx99-mark-two')
        expect(response.body).toHaveProperty('category', 'headphones')
    })

    it('GET /api/products/:category/:slug returns 404 for non-existent product', async () => {
        const response = await request(app).get('/api/products/headphones/not-existing-product')

        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            message: 'Product not found'
        })
    })

    it('POST /api/products/stock returns stock', async () => {
        const productsResponse = await request(app).get('/api/products/headphones')

        const productId = productsResponse.body[0].id

        const response = await request(app).post('/api/products/stock').send({ productIds: [productId] })

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body[0]).toHaveProperty('id', productId)
        expect(response.body[0]).toHaveProperty('stock')
    })
})