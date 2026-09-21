import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import Checkout from '@/widgets/Checkout/Checkout'
import { useCartStore } from '@/entities/cart/model/store'
import { postCreateOrder } from '@/entities/checkout/api/postCreateOrder'

vi.mock('@/entities/checkout/api/postCreateOrder', () => ({
    postCreateOrder: vi.fn()
}))

vi.mock('focus-trap-react', () => ({
    FocusTrap: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        back: vi.fn()
    })
}))

describe('Checkout Integration', () => {
    beforeEach(() => {
        vi.resetAllMocks()
        useCartStore.setState({ items: [] })
    })

    it('creates order and shows success state', async () => {
        const user = userEvent.setup()

        const product = {
            id: '1',
            slug: '1',
            category: 'headphones',
            image: '1.jpg',
            shortTitle: 'Product 1',
            price: 100,
            quantity: 1,
            stock: 10
        }

        useCartStore.setState({ items: [product] })

        render(<Checkout />)

        // fill form
        await user.type(
            screen.getByRole('textbox', { name: /name/i }),
            'John Doe'
        )

        await user.type(
            screen.getByRole('textbox', { name: /email address/i }),
            'Gt1tD@example.com'
        )

        await user.type(
            screen.getByRole('textbox', { name: /phone number/i }),
            '+12345678900'
        )

        await user.type(
            screen.getByRole('textbox', { name: /your address/i }),
            '123 Main St'
        )

        await user.type(
            screen.getByRole('textbox', { name: /zip code/i }),
            '12345'
        )

        await user.type(
            screen.getByRole('textbox', { name: /city/i }),
            'New York'
        )

        await user.type(
            screen.getByRole('textbox', { name: /country/i }),
            'United States'
        )

        await user.click(
            screen.getByRole('radio', { name: /cash on delivery/i })
        )

        vi.mocked(postCreateOrder).mockResolvedValue({
            id: 'order-1',
            status: 'PENDING',
            total: 100,
            shipping: 50,
            vat: 20,
            grandTotal: 150,
            items: [
                {
                    id: 'order-item-1',
                    productId: 'product-1',
                    quantity: 1,
                    price: 100,
                },
            ],
        })

        await user.click(
            screen.getByRole('button', { name: /continue & pay/i })
        )

        // create order
        await waitFor(() => {
            expect(
                postCreateOrder
            ).toHaveBeenCalledTimes(1)
        })

        // success state
        expect(
            document.getElementById('checkout-success-title')
        ).toBeInTheDocument()
        // back to home
        await user.click(
            screen.getByRole('link', { name: /back to home/i })
        )
        // clear cart
        window.dispatchEvent(new Event('pagehide'))
        // cart is empty
        await waitFor(() => {
            expect(useCartStore.getState().items).toEqual([])
        })
    })

    it('shows error when order creation fails', async () => {
        const user = userEvent.setup()

        const product = {
            id: '1',
            slug: '1',
            category: 'headphones',
            image: '1.jpg',
            shortTitle: 'Product 1',
            price: 100,
            quantity: 1,
            stock: 10
        }

        useCartStore.setState({ items: [product] })

        render(<Checkout />)

        // fill form
        await user.type(
            screen.getByRole('textbox', { name: /name/i }),
            'John Doe'
        )

        await user.type(
            screen.getByRole('textbox', { name: /email address/i }),
            'Gt1tD@example.com'
        )

        await user.type(
            screen.getByRole('textbox', { name: /phone number/i }),
            '+12345678900'
        )

        await user.type(
            screen.getByRole('textbox', { name: /your address/i }),
            '123 Main St'
        )

        await user.type(
            screen.getByRole('textbox', { name: /zip code/i }),
            '12345'
        )

        await user.type(
            screen.getByRole('textbox', { name: /city/i }),
            'New York'
        )

        await user.type(
            screen.getByRole('textbox', { name: /country/i }),
            'United States'
        )

        await user.click(
            screen.getByRole('radio', { name: /cash on delivery/i })
        )

        vi.mocked(postCreateOrder).mockImplementation(async () => {
            throw new Error('Failed to create order')
        })

        await user.click(
            screen.getByRole('button', { name: /continue & pay/i })
        )

        // create order
        await waitFor(() => {
            expect(
                postCreateOrder
            ).toHaveBeenCalledTimes(1)
        })
        // error state
        expect(
            document.getElementById('checkout-error-title')
        ).toBeInTheDocument()
        // cart must remain
        expect(useCartStore.getState().items).toHaveLength(1)
    })

    it('retries failed order creation successfully', async () => {
        const user = userEvent.setup()

        const product = {
            id: '1',
            slug: '1',
            category: 'headphones',
            image: '1.jpg',
            shortTitle: 'Product 1',
            price: 100,
            quantity: 1,
            stock: 10
        }

        useCartStore.setState({ items: [product] })

        vi.mocked(postCreateOrder)
            .mockRejectedValueOnce(async () => {
                new Error('Failed to create order')
            })
            .mockResolvedValueOnce({
            id: 'order-1',
            status: 'PENDING',
            total: 100,
            shipping: 50,
            vat: 20,
            grandTotal: 150,
            items: [
                {
                    id: 'order-item-1',
                    productId: 'product-1',
                    quantity: 1,
                    price: 100,
                },
            ],
        })

        render(<Checkout />)

        // fill form
        await user.type(
            screen.getByRole('textbox', { name: /name/i }),
            'John Doe'
        )

        await user.type(
            screen.getByRole('textbox', { name: /email address/i }),
            'Gt1tD@example.com'
        )

        await user.type(
            screen.getByRole('textbox', { name: /phone number/i }),
            '+12345678900'
        )

        await user.type(
            screen.getByRole('textbox', { name: /your address/i }),
            '123 Main St'
        )

        await user.type(
            screen.getByRole('textbox', { name: /zip code/i }),
            '12345'
        )

        await user.type(
            screen.getByRole('textbox', { name: /city/i }),
            'New York'
        )

        await user.type(
            screen.getByRole('textbox', { name: /country/i }),
            'United States'
        )

        await user.click(
            screen.getByRole('radio', { name: /cash on delivery/i })
        )

        await user.click(
            screen.getByRole('button', { name: /continue & pay/i })
        )

        // create order
        await waitFor(() => {
            expect(
                postCreateOrder
            ).toHaveBeenCalledTimes(1)
        })
        // error state
        expect(
            await screen.findByRole('heading', { name: '500' })
        ).toBeInTheDocument()
        // click try again
        await user.click(
            screen.getByRole('button', { name: /try again/i })
        )
        // create order second attempt
        await waitFor(() => {
            expect(
                postCreateOrder
            ).toHaveBeenCalledTimes(2)
        })
        // success state
        expect(
            document.getElementById('checkout-success-title')
        ).toBeInTheDocument()
    })
})