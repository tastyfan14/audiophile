import type { CartItem } from '@/entities/cart/model/types'
import { CheckoutSchema } from '@/entities/checkout/model/types'
import type { CheckoutCreateOrderDto } from '@audiophile/shared'

export function createOrderPayload(data: CheckoutSchema, items: CartItem[]): CheckoutCreateOrderDto {
    return {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zip: data.zip,
        country: data.country,

        paymentMethod:
            data.payment.paymentMethod === 'emoney'
                ? 'E_MONEY'
                : 'CASH_ON_DELIVERY',

        items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
        })),
    }
}