import type { CheckoutPaymentOption } from './types'

export const CHECKOUT_PAYMENT_OPTIONS = [
    {
        id: 'emoney',
        value: 'emoney',
        label: 'e-Money',
    },
    {
        id: 'cashondelivery',
        value: 'cashondelivery',
        label: 'Cash on Delivery',
    },
] satisfies CheckoutPaymentOption[]