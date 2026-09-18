import { CheckoutSchema } from '@/entities/checkout/model/types'
import Input from '@/shared/ui/Input'
import Label from '@/shared/ui/Label'
import clsx from 'clsx'
import cls from './Checkout.module.scss'
import { useFormContext } from 'react-hook-form'

export default function CheckoutBilling() {
    const { register, formState: { errors } } = useFormContext<CheckoutSchema>()

    return (
        <div className={clsx(cls['checkout-step__fields'], cls['checkout-step__fields--billing'])}>
            <Label errorId='name' errorMessage={errors.name?.message} title='Name'>
                <Input
                {...register('name')}
                errorId='name'
                aria-invalid={!!errors.name}
                placeholder='Alexei Ward'
                />
            </Label>

            <Label errorId='email' errorMessage={errors.email?.message} title='Email Address'>
                <Input
                {...register('email')}
                errorId='email'
                aria-invalid={!!errors.email}
                placeholder='alexei@mail.com'
                />
            </Label>

            <Label errorId='phone' errorMessage={errors.phone?.message} title='Phone Number'>
                <Input
                {...register('phone')}
                errorId='phone'
                aria-invalid={!!errors.phone}
                placeholder='+1 (202) 555-0136'
                />
            </Label>
        </div>
    )
}