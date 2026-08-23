'use client'

import clsx from 'clsx'
import cls from './Cart.module.scss'
import Button from '@/shared/ui/Button'
import Counter from '@/shared/ui/Counter'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import { FocusTrap } from 'focus-trap-react'
import { ROUTES } from '@/shared/config/constants'
import type { CartProps } from './types'
import { useCartStore } from '@/entities/cart/model/store'
import { useEffect } from 'react'
import { useLockBodyScroll } from '@/shared/lib/useLockBodyScroll'

export default function Cart({ isOpen, onClose, className }: CartProps) {
    useLockBodyScroll(isOpen)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEscape)

        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    const items = useCartStore(state => state.items)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const clearCart = useCartStore(state => state.clearCart)
    const reduce = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    return (
        <FocusTrap
        active={isOpen}
        focusTrapOptions={{
            returnFocusOnDeactivate: true,
            clickOutsideDeactivates: true,
        }}
        >
            {/* Checking the availability of items in the cart */}
            {items.length === 0
                ? (
                    <div
                    id='cart'
                    className={clsx(cls.cart, cls['cart-empty'], className)}
                    role='dialog'
                    aria-modal='true'
                    >
                        <h2 className={cls['cart-empty__title']}>Your cart is empty</h2>

                        <p className={cls['cart-empty__desc']}>Don’t wait, start shopping now.</p>

                        <Button
                        as='link'
                        href={ROUTES.Products.route}
                        variant='secondary'
                        className={cls['cart-empty__button']}
                        onClick={onClose}
                        >
                            Shop Now
                        </Button>
                    </div>
                ) : (
                    <div
                    id='cart'
                    className={clsx(cls.cart, ['cart-content'])}
                    role='dialog'
                    aria-modal='true'
                    >
                        {/* There's a product counter and a full cleaning button */}
                        <div className={cls['cart-content__interactive']}>
                            <h2 className={cls['cart-content__interactive--title']}>Cart ({items.length})</h2>

                            <Button
                            variant='additional'
                            className={cls['cart-content__interactive--button']}
                            onClick={clearCart}>
                                Remove all
                            </Button>
                        </div>

                        {/* Here are the products themselves */}
                        <div className={clsx(cls['cart-content__products'])}>
                            {items.map((item) => {
                                return (
                                    <div
                                    key={item.id}
                                    className={cls['cart-content__product']}>
                                        <ResponsiveImage
                                        mobile={`/images/mobile/products/image-${item.image}`}
                                        alt={item.title}
                                        className={cls['cart-content__product--image']}
                                        loading='lazy'
                                        />

                                        <div className={cls['cart-content__product--overview']}>
                                            <h3 className={cls['cart-content__product--title']}>{item.title}</h3>
                                            <h4 className={cls['cart-content__product--price']}>$ {item.price}</h4>
                                        </div>

                                        <Counter
                                        value={item.quantity}
                                        onChange={(quantity) => updateQuantity(item.id, quantity)}
                                        className={cls['cart-content__product--counter']}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        {/* Cta */}
                        <div className={cls['cart-content__cta']}>
                            <h2 className={cls['cart-content__cta--title']}>TOTAL</h2>
                            <h3 className={cls['cart-content__cta--price']}>$ {reduce}</h3>
                        </div>

                        {/* Go to checkout */}
                        <Button
                        as='link'
                        href={ROUTES.Checkout.route}
                        variant='primary'
                        className={cls['cart-content__button']}
                        onClick={onClose}
                        >
                            {ROUTES.Checkout.label}
                        </Button>
                    </div>
                )
            }
        </FocusTrap>
    )
}