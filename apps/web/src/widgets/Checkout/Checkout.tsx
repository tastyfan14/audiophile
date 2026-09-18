'use client'

import { useState } from 'react'
import cls from './Checkout.module.scss'
import clsx from 'clsx'
import BackToPreviousPage from '@/features/BackNavigation/ui/BackToPreviousPage'
import CheckoutAside from './CheckoutAside'
import CheckoutEmpty from './CheckoutEmpty'
import CheckoutSuccess from './CheckoutSuccess'
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

export default function Checkout() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOrderCompleted, setIsOrderCompleted] = useState<boolean>(false)

    const items = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)

    const total = calculateTotal(items)
    const vat = calculateVat(total)
    const grandTotal = calculateGrandTotal(total)

    const methods = useForm<CheckoutSchema>({
        resolver: zodResolver(checkoutSchema),
        mode: 'onBlur',
    })

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods

    const onSubmit = async (data: CheckoutSchema) => {
        await postCreateOrder(createOrderPayload(data, items))

        setIsOrderCompleted(true)

        reset()

        setIsOpen(true)
    }

    useClearCartOnOrderComplete(isOrderCompleted) // hook

    const handleSuccessClose = () => {
        setIsOpen(false)
        clearCart()
    }

    return (
        <section className={cls.checkout}>
            <CheckoutSuccess isOpen={isOpen} onClose={handleSuccessClose} grandTotal={grandTotal} />

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