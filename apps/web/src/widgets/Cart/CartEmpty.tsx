import clsx from 'clsx'
import cls from './Cart.module.scss'
import Button from '@/shared/ui/Button'
import type { CartEmptyProps } from './types'
import { ROUTES } from '@/shared/config/constants'

export default function CartEmpty({ onClose }: CartEmptyProps) {
    return (
        <div
        id='cart'
        className={clsx(cls.cart, cls['cart-empty'])}
        role='dialog'
        aria-modal='true'
        >
            <h2 className={cls['cart-empty__title']}>Your cart is empty</h2>

            <p className={cls['cart-empty__desc']}>Don’t wait, start shopping now.</p>

            <Button
            as='link'
            href={ROUTES.products.route}
            variant='secondary'
            className={cls['cart-empty__button']}
            onClick={onClose}
            >
                Shop Now
            </Button>
        </div>
    )
}