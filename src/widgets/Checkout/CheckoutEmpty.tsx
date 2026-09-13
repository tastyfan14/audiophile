import cls from './Checkout.module.scss'
import ICart from '@/shared/assets/icons/ICart'

export default function CheckoutEmpty() {
    return (
        <section className={cls['checkout-empty']}>
            <div className={cls['checkout-empty__icon']}>
                <ICart />
            </div>

            <h1 className={cls['checkout-empty__title']}>Your cart is empty</h1>
            <p className={cls['checkout-empty__desc']}>An order cannot be placed until items have been selected. Please add products to your cart to complete the checkout process.</p>
        </section>
    )
}