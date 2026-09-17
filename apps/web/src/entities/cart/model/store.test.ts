import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from './store'

const products = [
    {
        id: '1',
        slug: '1',
        category: '1',
        image: '1',
        shortTitle: '1',
        price: 4500,
        quantity: 2,
        stock: 7,
    },
    {
        id: '2',
        slug: '2',
        category: '2',
        image: '2',
        shortTitle: '2',
        price: 999,
        quantity: 5,
        stock: 5,
    },
    {
        id: '3',
        slug: '3',
        category: '3',
        image: '3',
        shortTitle: '3',
        price: 30,
        quantity: 779,
        stock: 1400,
    },
]

const MAX_QUANTITY = 999

describe('cartStore', () => {
    beforeEach(() => useCartStore.setState({
        items: [],
    }))

    it('adds a product to the cart', () => {
        const { addItem } = useCartStore.getState()

        addItem(products[0])

        const { items } = useCartStore.getState()

        expect(items).toHaveLength(1)
        expect(items[0]).toEqual(products[0])
    })

    it('increases quantity when adding an existing product', () => {
        const { addItem } = useCartStore.getState()

        addItem(products[0])
        addItem(products[0])

        const { items } = useCartStore.getState()

        expect(items).toHaveLength(1)
        expect(items[0].quantity).toBe(4)
    })

    it('removes a product from the cart', () => {
        const { addItem, removeItem } = useCartStore.getState()

        addItem(products[0])
        removeItem(products[0].id)

        const { items } = useCartStore.getState()

        expect(items).toHaveLength(0)
    })

    it('increases item quantity', () => {
        const { addItem, updateQuantity } = useCartStore.getState()

        addItem(products[0])
        updateQuantity(products[0].id, 3)

        const { items } = useCartStore.getState()

        expect(items).toHaveLength(1)
        expect(items[0].quantity).toBe(3)
    })

    it('decreases item quantity', () => {
        const { addItem, updateQuantity } = useCartStore.getState()

        addItem(products[0])
        addItem(products[0])
        updateQuantity(products[0].id, 1)

        const { items } = useCartStore.getState()

        expect(items).toHaveLength(1)
        expect(items[0].quantity).toBe(1)
    })

    it('does not exceed product stock', () => {
        const { addItem, updateQuantity } = useCartStore.getState()

        addItem(products[0])

        updateQuantity(products[0].id, 33)

        const { items } = useCartStore.getState()

        expect(items[0].stock).toBe(7)
    })

    it('does not exceed MAX_QUANTITY', () => {
        const { addItem, updateQuantity } = useCartStore.getState()

        addItem(products[2])

        updateQuantity(products[2].id, 1200)

        const { items } = useCartStore.getState()

        expect(items[0].quantity).toBe(MAX_QUANTITY)
    })

    it('clears the cart', () => {
        const { addItem, clearCart } = useCartStore.getState()

        addItem(products[1])
        addItem(products[2])

        clearCart()

        const { items } = useCartStore.getState()

        expect(items).toHaveLength(0)
    })
})