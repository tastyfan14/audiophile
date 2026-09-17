import type { Product } from '@/entities/product/model/types'

export type AddToCart = {
    product: Product
    currentStock: number
    currentQuantity: number
    className?: string
}