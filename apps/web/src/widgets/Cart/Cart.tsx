'use client'

import clsx from 'clsx'
import cls from './Cart.module.scss'
import Button from '@/shared/ui/Button'
import Spinner from '@/shared/ui/Spinner'
import SelectedProducts from '@/shared/ui/SelectedProducts/SelectedProducts'
import RemoveFromCart from '@/features/RemoveFromCart/ui/RemoveFromCart'
import { FocusTrap } from 'focus-trap-react'
import { ROUTES } from '@/shared/config/constants'
import type { CartProps } from './types'
import { useCartStore } from '@/entities/cart/model/store'
import { useEscapeKey } from '@/shared/lib/useEscapeKey'
import { calculateTotal } from '@/entities/cart/lib/calculations'
import { formatPrice } from '@/shared/lib/formatPrice'

export default function Cart({ isSyncing, isOpen, onClose, className }: CartProps) {
    useEscapeKey({ isOpen, onClose })

    const items = useCartStore(state => state.items)
    const total = calculateTotal(items)

    return (
        <FocusTrap
        active={isOpen && !isSyncing}
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
                        href={ROUTES.products.route}
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
                    className={clsx(cls.cart, cls['cart-content'], isSyncing && cls['cart-content--loading'])}
                    role='dialog'
                    aria-modal='true'
                    >
                        {isSyncing ? (
                            <Spinner />
                        ) : (
                            <>
                                {/* There's a product counter and a full cleaning button */}
                                <div className={cls['cart-content__interactive']}>
                                    <h2 className={cls['cart-content__interactive--title']}>Cart ({items.length})</h2>
                                    
                                    <RemoveFromCart className={cls['cart-content__interactive--button']} />
                                </div>

                                {/* Here are the products themselves */}
                                <SelectedProducts variant='cart' />

                                {/* Cta */}
                                <div className={cls['cart-content__cta']}>
                                    <h2 className={cls['cart-content__cta--title']}>TOTAL</h2>
                                    <h3 className={cls['cart-content__cta--price']}>$ {formatPrice(total)}</h3>
                                </div>

                                {/* Go to checkout */}
                                <Button
                                as='link'
                                href={ROUTES.checkout.route}
                                variant='primary'
                                className={cls['cart-content__button']}
                                onClick={onClose}
                                >
                                    {ROUTES.checkout.label}
                                </Button>
                            </>
                        )}
                    </div>
                )
            }
        </FocusTrap>
    )
}