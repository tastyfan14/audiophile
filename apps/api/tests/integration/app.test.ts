import { describe, expect, it } from 'vitest'
import app from '../../src/app'
import request from 'supertest'

describe('App', () => {
    it('returns 404 for unknown route', async () => {
        const response = await request(app).get('/api/not-existing-route')

        expect(response.status).toBe(404)
    })
})