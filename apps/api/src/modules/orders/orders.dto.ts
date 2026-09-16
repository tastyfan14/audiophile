export type CreateOrderItemDto = {
    productId: string
    quantity: number
}

export type CreateOrderDto = {
    name: string
    email: string
    phone: string
    address: string
    city: string
    zip: string
    country: string
    paymentMethod: 'E_MONEY' | 'CASH_ON_DELIVERY'
    items: CreateOrderItemDto[]
}