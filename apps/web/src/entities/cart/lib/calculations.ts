import { SHIPPING, VAR_RATE } from '@/shared/config/constants'
import type { CartItem } from '../model/types'

export function calculateTotal(items: CartItem[]): number {
    return (items.reduce((sum, item) => sum + item.price * item.quantity, 0))
}

export function calculateVat(total: number): number {
    return (total * VAR_RATE)
}

export function calculateGrandTotal(total: number): number {
    return (total + SHIPPING)
}