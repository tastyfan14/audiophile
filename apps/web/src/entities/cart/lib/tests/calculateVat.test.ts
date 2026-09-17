import { describe, expect, it } from 'vitest'
import { calculateVat } from '../calculations'

describe('calculateVat', () => {
    it('calculates vat correctly', () => {
        expect(calculateVat(23481)).toBe(4696.2)
    })

    it('returns 0 for an empty cart', () => {
        expect(calculateVat(0)).toBe(0)
    })

    it('throws an error when price is negative', () => {
        expect(calculateVat(-10000)).toBe(-2000)
    })
})