import cls from './Checkout.module.scss'
import clsx from 'clsx'
import Button from '@/shared/ui/Button'
import Spinner from '@/shared/ui/Spinner'
import SelectedProducts from '@/shared/ui/SelectedProducts'
import { SHIPPING } from '@audiophile/shared'
import { formatPrice } from '@/shared/lib/formatPrice'

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

            <SelectedProducts variant='summary' currentStock={undefined} />

            <dl className={cls['checkout-aside__dl']}>
                <dt className={cls['checkout-aside__dt']}>Total</dt>
                <dd className={cls['checkout-aside__dd']}>$ {formatPrice(total)}</dd>

                <dt className={cls['checkout-aside__dt']}>Shipping</dt>
                <dd className={cls['checkout-aside__dd']}>$ {formatPrice(SHIPPING)}</dd>

                <dt className={cls['checkout-aside__dt']}>VAT (Included)</dt>
                <dd className={cls['checkout-aside__dd']}>$ {formatPrice(vat)}</dd>

                <dt className={cls['checkout-aside__dt']}>
                    <strong>
                        Grand Total
                    </strong>
                </dt>
                <dd className={clsx(cls['checkout-aside__dd'], cls['checkout-aside__dd--accent'])}>
                    <strong>
                        $ {formatPrice(grandTotal)}
                    </strong>
                </dd>
            </dl>

            <Button
            variant='primary'
            type='submit'
            form='checkout-form'
            className={cls['checkout-aside__button']}
            loading={isSubmit}
            >
                {isSubmit ? <Spinner /> : 'CONTINUE & PAY'}
            </Button>
        </aside>
    )
}