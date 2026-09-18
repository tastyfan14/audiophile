import { CHECKOUT_PAYMENT_OPTIONS } from '@/entities/checkout/model/config'
import { CheckoutSchema } from '@/entities/checkout/model/types'
import ICashOnDelivery from '@/shared/assets/icons/ICashOnDelivery'
import Input from '@/shared/ui/Input'
import Label from '@/shared/ui/Label'
import RadioCard from '@/shared/ui/Radio/RadioCard'
import RadioGroup from '@/shared/ui/Radio/RadioGroup'
import { Controller, useFormContext } from 'react-hook-form'
import cls from './Checkout.module.scss'

export default function CheckoutPayment() {
    const { control, getFieldState, register } = useFormContext<CheckoutSchema>()

    return (
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
                            <Label
                                errorId='payment.eMoneyNumber'
                                errorMessage={eMoneyNumberState.error?.message}
                                title='e-Money Number'
                            >
                                <Input
                                    {...register('payment.eMoneyNumber')}
                                    errorId='payment.eMoneyNumber'
                                    aria-invalid={eMoneyNumberState.invalid}
                                    placeholder='238521993'
                                />
                            </Label>
                            <Label
                                errorId='payment.eMoneyPin'
                                errorMessage={eMoneyPinState.error?.message}
                                title='e-Money Pin'
                            >
                                <Input
                                    {...register('payment.eMoneyPin')}
                                    errorId='payment.eMoneyPin'
                                    aria-invalid={eMoneyPinState.invalid}
                                    placeholder='6891'
                                />
                            </Label>
                        </div>
                    )}

                    {field.value === 'cashondelivery' && (
                        <div className={cls['checkout-step__payment--cash']}>
                            <ICashOnDelivery />

                            <p>
                                The ‘Cash on Delivery’ option enables you to pay in cash when
                                our delivery courier arrives at your residence. Just make sure
                                your address is correct so that your order will not be
                                cancelled.
                            </p>
                        </div>
                    )}
                </>
            )
        }}
        />
    )
}