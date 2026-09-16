import { api } from '@/shared/api/api'
import ProductDto from './mappers'
import axios from 'axios'

export const getProduct = async (category: string, slug: string) => {
    try {
        const response = await api.get(`/api/products/${category}/${slug}`)

        const product = response.data

        return ProductDto(product)
    } catch(e) {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
            return null
        }

        throw e
    }
}