'use client'

import Overlay from '@/shared/ui/Overlay'
import Button from '@/shared/ui/Button'
import TryAgain from '@/features/TryAgain/ui/TryAgain'
import { FocusTrap } from 'focus-trap-react'
import cls from './Checkout.module.scss'
import { useEscapeKey } from '@/shared/lib/useEscapeKey'

type CheckoutErrorProps = {
    isOpen: boolean
    onClose: () => void
    onRetry?: () => void
    status: number | undefined
}

export default function CheckoutError({ isOpen, onClose, onRetry, status }: CheckoutErrorProps) {
    useEscapeKey({ isOpen, onClose })

    return (
        <Overlay
        isOpen={isOpen}
        onClose={onClose}
        coverage='viewport'
        className={cls['checkout-error']}
        >
            <FocusTrap
            active={isOpen}
            focusTrapOptions={{
                returnFocusOnDeactivate: true,
                clickOutsideDeactivates: false,
            }}
            >
                <div
                role='alertdialog'
                aria-modal='true'
                aria-labelledby='checkout-error-title'
                aria-describedby='checkout-error-desc'
                className={cls['checkout-error__content']}
                >
                    <h1 id='checkout-error-title' className={cls['checkout-error__title']}>{status ? status : 'Unknown error'}</h1>

                    <p id='checkout-error-desc' className={cls['checkout-error__desc']}>
                        {status === 500
                        ? (
                            <>
                                {`We couldn't place your order due to a temporary issue.`}
                                <br />
                                Please try again.
                            </>
                        ) : status === 404 ? (
                            <>
                                One or more products in your cart are no longer available.
                                <br />
                                Please review your cart.
                            </>
                        ) : status === 401 ? (
                            <>
                                Some items in your cart are no longer available in the requested quantity.
                                <br />
                                Please review your cart.
                            </>
                        ) : (
                            <>
                                {`We couldn't place your order due to a temporary issue.`}
                                <br />
                                Please try again later.
                            </>
                        )}
                    </p>

                    {status === 500 && onRetry
                    ? (
                        <div className={cls['checkout-error__interactive']}>
                            <TryAgain variant='primary' onRetry={onRetry} />

                            <Button variant='primary' onClick={onClose}>Close</Button>
                        </div>
                    ) : (
                        <Button variant='primary' onClick={onClose}>Close</Button>
                    )}
                </div>
            </FocusTrap>
        </Overlay>
    )
}