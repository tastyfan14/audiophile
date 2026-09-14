import cls from './Checkout.module.scss'
import clsx from 'clsx'
import Button from '@/shared/ui/Button'
import { SHIPPING } from '@/shared/config/constants'
import Spinner from '@/shared/ui/Spinner'
import SelectedProducts from '@/shared/ui/SelectedProducts'

type CheckoutAsideProps = {
    total: number
    vat: number
    grandTotal: number
    isSubmit: boolean
}

export default function CheckoutAside({ total, vat, grandTotal, isSubmit }: CheckoutAsideProps) {
    return (
        <aside
        className={cls['checkout-aside']} 
        aria-labelledby='checkout-aside-title'
        >
            <h2 id='checkout-aside-title' className={cls['checkout-aside__title']}>SUMMARY</h2>

            <SelectedProducts variant='summary' />

            <dl className={cls['checkout-aside__dl']}>
                <dt className={cls['checkout-aside__dt']}>Total</dt>
                <dd className={cls['checkout-aside__dd']}>$ {total.toLocaleString('en-US')}</dd>

                <dt className={cls['checkout-aside__dt']}>Shipping</dt>
                <dd className={cls['checkout-aside__dd']}>$ {SHIPPING.toLocaleString('en-US')}</dd>

                <dt className={cls['checkout-aside__dt']}>VAT (Included)</dt>
                <dd className={cls['checkout-aside__dd']}>$ {vat.toLocaleString('en-US')}</dd>

                <dt className={cls['checkout-aside__dt']}>
                    <strong>
                        Grand Total
                    </strong>
                </dt>
                <dd className={clsx(cls['checkout-aside__dd'], cls['checkout-aside__dd--accent'])}>
                    <strong>
                        $ {grandTotal.toLocaleString('en-US')}
                    </strong>
                </dd>
            </dl>

            <Button
            variant='primary'
            type='submit'
            form='checkout-form'
            className={cls['checkout-aside__button']}
            disabled={isSubmit}
            >
                {isSubmit ? <Spinner /> : 'CONTINUE & PAY'}
            </Button>
        </aside>
    )
}