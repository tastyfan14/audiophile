import { Product } from '@/entities/product/model/types'

export type CartItem = Pick<Product, 'id' | 'slug' | 'category' | 'image' | 'shortTitle' | 'price'> & {
    quantity: number
}

export interface CartStore {
    items: CartItem[]

    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}