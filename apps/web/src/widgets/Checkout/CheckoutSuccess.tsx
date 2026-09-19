'use client'

import IOrderConfirmation from '@/shared/assets/icons/IOrderConfimation'
import Button from '@/shared/ui/Button'
import SelectedProducts from '@/shared/ui/SelectedProducts'
import Overlay from '@/shared/ui/Overlay'
import { FocusTrap } from 'focus-trap-react'
import cls from './Checkout.module.scss'
import clsx from 'clsx'
import { useState } from 'react'
import { useEscapeKey } from '@/shared/lib/useEscapeKey'
import { useCartStore } from '@/entities/cart/model/store'
import BackToHome from '@/features/BackNavigation/ui/BackToHome'
import { formatPrice } from '@/shared/lib/formatPrice'

type CheckoutSuccessProps = {
    isOpen: boolean
    onClose: () => void
    grandTotal: number
}

export default function CheckoutSuccess({ isOpen, onClose, grandTotal }: CheckoutSuccessProps) {
    const [isShow, setIsShow] = useState<boolean>(false)

    const items = useCartStore(state => state.items)

    useEscapeKey({ isOpen, onClose })

    return (
        <Overlay
        isOpen={isOpen}
        onClose={onClose}
        coverage='viewport'
        className={cls['checkout-success']}
        >
            <FocusTrap
            active={isOpen}
            focusTrapOptions={{
                returnFocusOnDeactivate: true,
                clickOutsideDeactivates: false,
            }}
            >
                <div className={cls['checkout-success__content']}>
                    <IOrderConfirmation className={cls['checkout-success__icon']} />

                    <h1 className={cls['checkout-success__title']}>
                        THANK YOU
                        <br/>
                        FOR YOUR ORDER
                    </h1>

                    <p className={cls['checkout-success__desc']}>You will receive an email confirmation shortly.</p>

                    <div className={cls['checkout-success__items']}>
                        <div className={cls['checkout-success__items-voucher']}>
                            {isShow
                                ? (
                                    <>
                                        <SelectedProducts variant='overlay' currentStock={undefined} />

                                        {items.length > 1 && <div className={cls['checkout-success__items-voucher--line']} />}

                                        <Button
                                        variant='empty'
                                        onClick={() => setIsShow(prev => !prev)}
                                        className={cls['checkout-success__items-voucher--others']}
                                        >
                                            View less
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <SelectedProducts variant='overlay--single' currentStock={undefined} />

                                        {items.length > 1 && <div className={cls['checkout-success__items-voucher--line']} />}

                                        {items.length > 1 && (
                                            <Button
                                            variant='empty'
                                            onClick={() => setIsShow(prev => !prev)}
                                            className={cls['checkout-success__items-voucher--others']}
                                            >
                                                and {items.length - 1} other item(s)
                                            </Button>
                                        )}
                                    </>
                                )
                            }
                        </div>

                        <div className={clsx(cls['checkout-success__items-total'], isShow && cls['checkout-success__items-total--centered'])}>
                            <h2 className={cls['checkout-success__items-total--title']}>GRAND TOTAL</h2>

                            <p className={cls['checkout-success__items-total--price']}>
                                ${' '}
                                <strong>
                                    {formatPrice(grandTotal)}
                                </strong>
                            </p>
                        </div>
                    </div>

                    <BackToHome variant='primary' />
                </div>
            </FocusTrap>
        </Overlay>
    )
}