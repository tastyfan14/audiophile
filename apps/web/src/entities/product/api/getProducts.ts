import { api } from '@/shared/api/api'
import type { ProductDto } from '@audiophile/shared'

export const getProducts = async (category?: string) => {
    const url = category ? `/api/products/${category}` : `/api/products`

    const response = await api.get<ProductDto[]>(url)

    const products = response.data

    return products
}