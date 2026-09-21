'use client'

import { useState } from 'react'
import cls from './Checkout.module.scss'
import clsx from 'clsx'
import BackToPreviousPage from '@/features/BackNavigation/ui/BackToPreviousPage'
import CheckoutAside from './CheckoutAside'
import CheckoutEmpty from './CheckoutEmpty'
import CheckoutSuccess from './CheckoutSuccess'
import CheckoutError from './CheckoutError'
import CheckoutBilling from './CheckoutBilling'
import CheckoutShipping from './CheckoutShipping'
import CheckoutPayment from './CheckoutPayment'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CheckoutSchema } from '@/entities/checkout/model/types'
import { checkoutSchema } from '@/entities/checkout/model/schema'
import { useCartStore } from '@/entities/cart/model/store'
import { calculateTotal, calculateVat, calculateGrandTotal } from '@/entities/cart/lib/calculations'
import { postCreateOrder } from '@/entities/checkout/api/postCreateOrder'
import { useClearCartOnOrderComplete } from '@/features/Checkout/model/useClearCartOnOrderComplete'
import { createOrderPayload } from '@/features/Checkout/model/createOrderPayload'
import axios from 'axios'

export default function Checkout() {
    const [isOpen, setIsOpen] = useState<'success' | 'error' | null>(null)
    const [isOrderCompleted, setIsOrderCompleted] = useState<boolean>(false)
    const [currentError, setCurrentError] = useState<number | null>(null)

    const items = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)

    const total = calculateTotal(items)
    const vat = calculateVat(total)
    const grandTotal = calculateGrandTotal(total)

    const methods = useForm<CheckoutSchema>({
        resolver: zodResolver(checkoutSchema),
        mode: 'onBlur',
        shouldUnregister: true,
    })

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods

    const onSubmit = async (data: CheckoutSchema) => {
        try {
            await postCreateOrder(createOrderPayload(data, items))

            setIsOrderCompleted(true)

            reset()

            setIsOpen('success')
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setCurrentError(e.response?.status ?? 500)
                setIsOpen('error')
            } else {
                setCurrentError(500)
                setIsOpen('error')
            }
        }
    }

    useClearCartOnOrderComplete(isOrderCompleted) // hook

    const handleSuccessClose = () => {
        setIsOpen(null)
        clearCart()
    }

    return (
        <section className={cls.checkout}>
            <CheckoutSuccess isOpen={isOpen === 'success'} onClose={handleSuccessClose} grandTotal={grandTotal} />
            <CheckoutError isOpen={isOpen === 'error'} onClose={() => setIsOpen('error')} onRetry={handleSubmit(onSubmit)} status={currentError || undefined} />

            <BackToPreviousPage className={cls['checkout__button']} />

            {items.length === 0 ? (
                <CheckoutEmpty />
            ) : (
                <FormProvider {...methods}>
                    <form
                    id='checkout-form'
                    className={cls['checkout-form']}
                    onSubmit={handleSubmit(onSubmit)}
                    >
                        <h1 className={cls['checkout-form__title']}>Checkout</h1>

                        <div className={cls['checkout-step']}>
                            <h2 className={cls['checkout-step__title']}>Billing details</h2>

                            <CheckoutBilling />
                        </div>

                        <div className={cls['checkout-step']}>
                            <h2 className={cls['checkout-step__title']}>shipping info</h2>

                            <CheckoutShipping />
                        </div>

                        <div className={clsx(cls['checkout-step'], cls['checkout-step__payment'])}>
                            <h2 className={cls['checkout-step__title']}>Payment details</h2>

                            <CheckoutPayment />
                        </div>
                    </form>

                    <CheckoutAside
                    total={total}
                    vat={vat}
                    grandTotal={grandTotal}
                    isSubmit={isSubmitting}
                    />
                </FormProvider>
            )}
        </section>
    )
}