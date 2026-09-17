import { describe, expect, it } from 'vitest'
import { calculateGrandTotal } from '../calculations'

describe('calculateGrandTotal', () => {
    it('calculates vat correctly', () => {
        expect(calculateGrandTotal(209202)).toBe(209252)
    })

    it('returns 0 for an empty cart', () => {
        expect(calculateGrandTotal(0)).toBe(50)
    })

    it('throws an error when price is negative', () => {
        expect(calculateGrandTotal(-499)).toBe(-449)
    })
})