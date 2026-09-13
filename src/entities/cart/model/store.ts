import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartStore } from './types'

const MAX_QUANTITY = 999

export const useCartStore = create<CartStore>()(
    persist((set) =>
        ({
            items: [],

            addItem: (item) => set((state) => {
                const existingItem = state.items.find((product) => product.id === item.id)

                if (existingItem) {
                    return (
                        { items: state.items.map((product) => product.id === item.id ? { ...product, quantity: Math.min(product.quantity + item.quantity, MAX_QUANTITY) } : product) }
                    )
                }

                return (
                    { items: [...state.items, {...item, quantity: Math.min(item.quantity, MAX_QUANTITY)}] }
                )
            }),

            removeItem: (id) => set((state) => (
                { items: state.items.filter((item) => item.id !== id) }
            )),

            updateQuantity: (id, quantity) => set((state) => (
                { items: state.items.map((item) => item.id === id ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) } : item).filter((item) => item.quantity > 0) }
            )),

            clearCart: () => set({ items: [] }),
        }),

        {
            name: 'cart-storage',
        }
    )
)