import { useCartStore } from '@/entities/cart/model/store'
import Cart from '@/widgets/Cart/Cart'
import AddToCart from '@/features/AddToCart/ui/AddToCart'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ROUTES } from '@/shared/config/constants'

vi.mock('focus-trap-react', () => ({
    FocusTrap: ({ children }: { children: React.ReactNode }) => children,
}))

describe('Cart Integration', () => {
    beforeEach(() => {
        useCartStore.setState({ items: [] })
    })

    it('shows empty cart when there are no items', () => {
        render(
            <Cart 
            currentStock={[]}
            isLoading={false}
            isFetching={false}
            isError={false}
            isOpen={true}
            onClose={() => {}}
            />
        )

        // cart empty title
        expect(
            screen.getByRole('heading', { name: /your cart is empty/i })
        ).toBeInTheDocument()
        // button title
        expect(
            screen.getByRole('link', { name: /shop now/i })
        ).toBeInTheDocument()
    })

    it('shows spinner while cart loading', () => {
        useCartStore.setState({ items: [
            {
                id: '1',
                slug: '1',
                category: 'headphones',
                image: '1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 1,
                stock: 10
            },
        ] })

        render(
            <Cart 
            currentStock={[]}
            isLoading={true}
            isFetching={false}
            isError={false}
            isOpen={true}
            onClose={() => {}}
            />
        )

        // cart aria-label title
        expect(
            screen.getByRole('status', { name: /loading/i })
        ).toBeInTheDocument()
    })

    it('shows cart items and their total quantity', () => {
        useCartStore.setState({ items: [
            {
                id: '1',
                slug: '1',
                category: 'headphones',
                image: '1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 1,
                stock: 10
            },
        ] })

        render(
            <Cart 
            currentStock={[]}
            isLoading={false}
            isFetching={false}
            isError={false}
            isOpen={true}
            onClose={() => {}}
            />
        )

        // product title
        expect(
            screen.getByText('Product 1')
        ).toBeInTheDocument()
        // product and total price
        expect(
            screen.getByRole('heading', { name: '$ 100' })
        ).toBeInTheDocument()
        // cart quantity
        expect(
            screen.getByRole('heading', { name: 'Cart (1)' })
        ).toBeInTheDocument()
    })

    it('shows error when stock loading fails', () => {
        useCartStore.setState({ items: [
            {
                id: '1',
                slug: '1',
                category: 'headphones',
                image: '1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 1,
                stock: 10
            },
        ] })

        render(
            <Cart 
            currentStock={[]}
            isLoading={false}
            isFetching={false}
            isError={true}
            isOpen={true}
            onClose={() => {}}
            />
        )

        // error message title
        expect(
            screen.getByRole('alert')
        ).toHaveTextContent('Failed to update product availability.')
    })

    it('shows multiple cart items and total', () => {
        useCartStore.setState({ items: [
            {
                id: '1',
                slug: '1',
                category: 'headphones',
                image: '1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 1,
                stock: 10
            },
            {
                id: '2',
                slug: '2',
                category: 'headphones',
                image: '2.jpg',
                shortTitle: 'Product 2',
                price: 200,
                quantity: 2,
                stock: 10
            },
        ]})

        render(
            <Cart 
            currentStock={[]}
            isLoading={false}
            isFetching={false}
            isError={false}
            isOpen={true}
            onClose={() => {}}
            />
        )

        // product 1 title
        expect(
            screen.getByText('Product 1')
        ).toBeInTheDocument()
        // product 2 title
        expect(
            screen.getByText('Product 2')
        ).toBeInTheDocument()
        // total price
        expect(
            screen.getByRole('heading', { name: '$ 500' })
        ).toBeInTheDocument()
    })

    it('checkout link points to checkout', () => {
        useCartStore.setState({ items: [
            {
                id: '1',
                slug: '1',
                category: 'headphones',
                image: '1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 1,
                stock: 10
            },
        ]})

        render(
            <Cart 
            currentStock={[]}
            isLoading={false}
            isFetching={false}
            isError={false}
            isOpen={true}
            onClose={() => {}}
            />
        )

        // checkout link
        expect(
            screen.getByRole('link', { name: /checkout/i })
        ).toHaveAttribute('href', ROUTES.checkout.route)
    })

    it('clears cart when remove all button is clicked', async () => {
        useCartStore.setState({ items: [
            {
                id: '1',
                slug: '1',
                category: 'headphones',
                image: '1.jpg',
                shortTitle: 'Product 1',
                price: 100,
                quantity: 1,
                stock: 10
            },
        ]})

        render(
            <Cart 
            currentStock={[]}
            isLoading={false}
            isFetching={false}
            isError={false}
            isOpen={true}
            onClose={() => {}}
            />
        )

        const user = userEvent.setup()
        const remove = screen.getByRole('button', { name: /remove all/i })

        // remove all button
        expect(
            remove
        ).toBeInTheDocument()
        // clears cart
        await user.click(remove)
        // cart is empty
        expect(
            useCartStore.getState().items
        ).toEqual([])
    })

    it('adds a product to cart', async () => {
        useCartStore.setState({ items: [] })

        const product = {
                    id: '1',
                    slug: '1',
                    category: 'headphones',
                    image: '1.jpg',
                    shortTitle: 'Product 1',
                    price: 100,
                    stock: 10
                }

        render(
            <>
                <Cart 
                currentStock={[]}
                isLoading={false}
                isFetching={false}
                isError={false}
                isOpen={true}
                onClose={() => {}}
                />

                <AddToCart
                product={product}
                currentStock={10}
                currentQuantity={1}
                />
            </>
        )

        const user = userEvent.setup()

        await user.click(
            screen.getByRole('button', { name: /add to cart/i })
        )

        // cart has product /zustand
        expect(
            useCartStore.getState().items
        ).toEqual([
            {
                ...product,
                quantity: 1
            }
        ])
        // cart has product /shortTitle
        expect(
            screen.getByText(product.shortTitle)
        ).toHaveTextContent('Product 1')
    })
})