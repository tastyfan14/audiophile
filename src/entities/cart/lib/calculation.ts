import { SHIPPING, VAR_RATE } from '@/shared/config/constants'
import type { CartItem } from '../model/types'

export function calculateTotal(items: CartItem[]) {
    return (items.reduce((sum, item) => sum + item.price * item.quantity, 0)).toLocaleString('en-US')
}

export function calculateVat(total: number) {
    return (total * VAR_RATE).toLocaleString('en-US')
}

export function calculateGrandTotal(total: number) {
    return (total + SHIPPING).toLocaleString('en-US')
}