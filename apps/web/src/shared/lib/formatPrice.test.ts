import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
    it('formats price with three thousands separator', () => {
        expect(formatPrice(3499)).toBe('3,499')
    })

    it('formats zero', () => {
        expect(formatPrice(0)).toBe('0')
    })

    it('formats large price', () => {
        expect(formatPrice(2993112)).toBe('2,993,112')
    })

    it('formats negative price', () => {
        expect(formatPrice(-6932)).toBe('-6,932')
    })
})