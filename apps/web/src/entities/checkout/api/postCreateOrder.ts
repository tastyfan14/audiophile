import { api } from '@/shared/api/api'
import type { CheckoutCreateOrderDto, CheckoutOrderResponse } from '@audiophile/shared'

export async function postCreateOrder(data: CheckoutCreateOrderDto): Promise<CheckoutOrderResponse> {
    const { data: order } = await api.post<CheckoutOrderResponse>('/api/checkout/create', data)

    return order
}