import { describe, expect, it } from 'vitest'
import { calculateTotal } from '../calculations'

describe('calculateTotal', () => {
    it('calculates total for one item', () => {
        expect(calculateTotal([
            {
                id: '1',
                slug: '1',
                category: '1',
                image: '1',
                shortTitle: '1',
                price: 20,
                quantity: 2, 
                stock: 2
            }
        ])).toBe(40)
    })

    it('calculates total for multiple items', () => {
        expect(calculateTotal([
            {
                id: '1',
                slug: '1',
                category: '1',
                image: '1',
                shortTitle: '1',
                price: 20,
                quantity: 2, 
                stock: 5
            },
            {
                id: '2',
                slug: '2',
                category: '2',
                image: '2',
                shortTitle: '2',
                price: 4990,
                quantity: 5, 
                stock: 5
            }
        ])).toBe(24990)
    })

    it('returns 0 for an empty cart', () => {
        expect(calculateTotal([])).toBe(0)
    })

    it('handles an item with quantity of 1', () => {
        expect(calculateTotal([
            {
                id: '1',
                slug: '1',
                category: '1',
                image: '1',
                shortTitle: '1',
                price: 2999,
                quantity: 1, 
                stock: 1
            }
        ])).toBe(2999)
    })

    it('throws an error when price is negative', () => {
        expect(calculateTotal([
            {
                id: '1',
                slug: '1',
                category: '1',
                image: '1',
                shortTitle: '1',
                price: -249,
                quantity: 3, 
                stock: 3
            }
        ])).toBe(-747)
    })
})