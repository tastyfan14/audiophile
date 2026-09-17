import { api } from '@/shared/api/api'
import axios from 'axios'
import type { ProductDto } from '@audiophile/shared'

export const getProduct = async (category: string, slug: string) => {
    try {
        const response = await api.get<ProductDto>(`/api/products/${category}/${slug}`)

        const product = response.data

        return product
    } catch(e) {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
            return null
        }

        throw e
    }
}