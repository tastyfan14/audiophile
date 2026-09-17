'use client'

import { useState } from 'react'
import cls from './Checkout.module.scss'
import clsx from 'clsx'
import Label from '@/shared/ui/Label'
import Input from '@/shared/ui/Input'
import BackToPreviousPage from '@/features/BackNavigation/ui/BackToPreviousPage'
import RadioCard from '@/shared/ui/Radio/RadioCard'
import RadioGroup from '@/shared/ui/Radio/RadioGroup'
import ICashOnDelivery from '@/shared/assets/icons/ICashOnDelivery'
import CheckoutAside from './CheckoutAside'
import CheckoutEmpty from './CheckoutEmpty'
import CheckoutSuccess from './CheckoutSuccess'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CheckoutSchema } from '@/entities/checkout/model/types'
import { checkoutSchema } from '@/entities/checkout/model/schema'
import { useCartStore } from '@/entities/cart/model/store'
import { calculateTotal, calculateVat, calculateGrandTotal } from '@/entities/cart/lib/calculations'
import { CHECKOUT_PAYMENT_OPTIONS } from '@/entities/checkout/model/config'
import { postCreateOrder } from '@/entities/checkout/api/postCreateOrder'
import { useClearCartOnOrderComplete } from '@/features/Checkout/model/useClearCartOnOrderComplete'
import { createOrderPayload } from '@/features/Checkout/model/createOrderPayload'

export default function Checkout() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOrderCompleted, setIsOrderCompleted] = useState<boolean>(false)

    const items = useCartStore(state => state.items)
    const clearCart = useCartStore(state => state.clearCart)

    const total = calculateTotal(items)
    const vat = calculateVat(total)
    const grandTotal = calculateGrandTotal(total)

    const {
        register,
        control,
        getFieldState,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutSchema>({
        resolver: zodResolver(checkoutSchema),
        mode: 'onBlur',
    })

    const onSubmit = async (data: CheckoutSchema) => {
        await postCreateOrder(createOrderPayload(data, items))

        setIsOrderCompleted(true)

        reset()

        setIsOpen(true)
    }

    useClearCartOnOrderComplete(isOrderCompleted)

    const handleSuccessClose = () => {
        setIsOpen(false)
        clearCart()
    }

    return (
        <section className={cls.checkout}>
            <CheckoutSuccess isOpen={isOpen} onClose={handleSuccessClose} grandTotal={grandTotal} />

            <BackToPreviousPage className={cls['checkout__button']} />

            {items.length === 0
                ?
                <CheckoutEmpty />
                :
                <>
                    <form id='checkout-form' className={cls['checkout-form']} onSubmit={handleSubmit(onSubmit)}>
                        <h1 className={cls['checkout-form__title']}>CHECKOUT</h1>

                        <div className={cls['checkout-step']}>
                            <h2 className={cls['checkout-step__title']}>Billing details</h2>

                            <div className={clsx(cls['checkout-step__fields'], cls['checkout-step__fields--billing'])}>
                                <Label errorId='name' errorMessage={errors.name?.message} title='Name'>
                                    <Input {...register('name')} errorId='name' aria-invalid={!!errors.name} placeholder='Alexei Ward' />
                                </Label>

                                <Label errorId='email' errorMessage={errors.email?.message} title='Email Address'>
                                    <Input {...register('email')} errorId='email' aria-invalid={!!errors.email} placeholder='alexei@mail.com' />
                                </Label>

                                <Label errorId='phone' errorMessage={errors.phone?.message} title='Phone Number'>
                                    <Input {...register('phone')} errorId='phone' aria-invalid={!!errors.phone} placeholder='+1 (202) 555-0136' />
                                </Label>
                            </div>
                        </div>

                        <div className={cls['checkout-step']}>
                            <h2 className={cls['checkout-step__title']}>shipping info</h2>

                            <div className={clsx(cls['checkout-step__fields'], cls['checkout-step__fields--shipping'])}>
                                <Label errorId='address' errorMessage={errors.address?.message} title='Your Address'>
                                    <Input {...register('address')} errorId='address' aria-invalid={!!errors.address} placeholder='1137 Williams Avenue' />
                                </Label>
                                <Label errorId='zip' errorMessage={errors.zip?.message} title='ZIP Code'>
                                    <Input {...register('zip')} errorId='zip' aria-invalid={!!errors.zip} placeholder='10001' />
                                </Label>
                                <Label errorId='city' errorMessage={errors.city?.message} title='City'>
                                    <Input {...register('city')} errorId='city' aria-invalid={!!errors.city} placeholder='New York' />
                                </Label>
                                <Label errorId='country' errorMessage={errors.country?.message} title='Country'>
                                    <Input {...register('country')} errorId='country' aria-invalid={!!errors.country} placeholder='United States' />
                                </Label>
                            </div>
                        </div>

                        <div className={clsx(cls['checkout-step'], cls['checkout-step__payment'])}>
                            <h2 className={cls['checkout-step__title']}>Payment details</h2>

                            <Controller
                            name='payment.paymentMethod'
                            control={control}
                            render={({ field, fieldState }) => {
                                const eMoneyNumberState = getFieldState('payment.eMoneyNumber')
                                const eMoneyPinState = getFieldState('payment.eMoneyPin')

                                return (
                                    <>
                                        <RadioGroup
                                        title='Payment Method'
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={CHECKOUT_PAYMENT_OPTIONS}
                                        errorId={'payment'}
                                        errorMessage={fieldState.error?.message}
                                        renderCard={({ option }) => (
                                            <RadioCard
                                            key={option.id}
                                            name='payment.paymentMethod'
                                            checked={option.id === field.value}
                                            aria-invalid={fieldState.invalid}
                                            errorId='payment'
                                            errorMessage='none'
                                            onChange={() => field.onChange(option.id)}
                                            >
                                                {option.label}
                                            </RadioCard>
                                        )}
                                        />

                                        {field.value === 'emoney' && (
                                            <div className={cls['checkout-step__payment--emoney']}>
                                                <Label errorId='payment.eMoneyNumber' errorMessage={eMoneyNumberState.error?.message} title='e-Money Number'>
                                                    <Input {...register('payment.eMoneyNumber')} errorId='payment.eMoneyNumber' aria-invalid={eMoneyNumberState.invalid} placeholder='238521993' />
                                                </Label>
                                                <Label errorId='payment.eMoneyPin' errorMessage={eMoneyPinState.error?.message} title='e-Money Pin'>
                                                    <Input {...register('payment.eMoneyPin')} errorId='payment.eMoneyPin' aria-invalid={eMoneyPinState.invalid} placeholder='6891' />
                                                </Label>
                                            </div>
                                        )}

                                        {field.value === 'cashondelivery' && (
                                            <div className={cls['checkout-step__payment--cash']}>
                                                <ICashOnDelivery />
                                                <p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                                            </div>
                                        )}
                                    </>
                                )
                            }}
                            />
                        </div>
                    </form>

                    <CheckoutAside total={total} vat={vat} grandTotal={grandTotal} isSubmit={isSubmitting} />
                </>
            }
        </section>
    )
}