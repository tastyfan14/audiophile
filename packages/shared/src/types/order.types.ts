export type CheckoutCreateOrderItemDto = {
    productId: string
    quantity: number
}

export type CheckoutCreateOrderDto = {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zip: string
    country: string
    paymentMethod: 'E_MONEY' | 'CASH_ON_DELIVERY'
    items: CheckoutCreateOrderItemDto[]
}

export type CheckoutOrderResponse = {
    id: string
    status: string
    total: number
    shipping: number
    vat: number
    grandTotal: number
    items: (CheckoutCreateOrderItemDto & {
        id: string
        price: number
    })[]
}