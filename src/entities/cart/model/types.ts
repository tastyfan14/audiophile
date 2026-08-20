import { Product } from '@/entities/product/model/types'

export type CartItem = Pick<Product, 'id' | 'image' | 'title' | 'price'> & {
    quantity: number
}

export interface CartStore {
    items: CartItem[]

    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}