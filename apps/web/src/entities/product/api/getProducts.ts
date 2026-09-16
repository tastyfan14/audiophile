import { api } from '@/shared/api/api'
import ProductDto from './mappers'

export const getProducts = async (category?: string) => {
    const url = category ? `/api/products/${category}` : `/api/products`

    const response = await api.get(url)

    const products = response.data

    const mappedProducts = products.map(ProductDto)

    return mappedProducts
}