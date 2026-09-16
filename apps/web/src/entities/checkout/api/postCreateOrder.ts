import type { CheckoutCreateOrderDto, CheckoutOrderResponse } from './types'
import { api } from '@/shared/api/api'

export async function postCreateOrder(data: CheckoutCreateOrderDto): Promise<CheckoutOrderResponse> {
    const { data: order } = await api.post<CheckoutOrderResponse>('/api/checkout/create', data)

    return order
}