import type { Product } from '@/entities/product/model/types'

export type AddToCart = {
    product: Pick<Product, 'id' | 'slug' | 'category' | 'image' | 'shortTitle' | 'price' | 'stock'>
    currentStock: number
    currentQuantity: number
    className?: string
}