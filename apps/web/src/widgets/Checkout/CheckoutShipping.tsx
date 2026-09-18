import { CheckoutSchema } from '@/entities/checkout/model/types'
import Label from '@/shared/ui/Label'
import Input from '@/shared/ui/Input'
import clsx from 'clsx'
import cls from './Checkout.module.scss'
import { useFormContext } from 'react-hook-form'

export default function CheckoutShipping() {
    const {
        register,
        formState: { errors },
    } = useFormContext<CheckoutSchema>()

    return (
        <div className={clsx(cls['checkout-step__fields'], cls['checkout-step__fields--shipping'])}>
            <Label errorId='address' errorMessage={errors.address?.message} title='Your Address'>
                <Input
                {...register('address')}
                errorId='address'
                aria-invalid={!!errors.address}
                placeholder='1137 Williams Avenue'
                />
            </Label>
            <Label errorId='zip' errorMessage={errors.zip?.message} title='ZIP Code'>
                <Input
                {...register('zip')}
                errorId='zip'
                aria-invalid={!!errors.zip}
                placeholder='10001'
                />
            </Label>
            <Label errorId='city' errorMessage={errors.city?.message} title='City'>
                <Input
                {...register('city')}
                errorId='city'
                aria-invalid={!!errors.city}
                placeholder='New York'
                />
            </Label>
            <Label errorId='country' errorMessage={errors.country?.message} title='Country'>
                <Input
                {...register('country')}
                errorId='country'
                aria-invalid={!!errors.country}
                placeholder='United States'
                />
            </Label>
        </div>
    )
}