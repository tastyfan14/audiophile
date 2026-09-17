import { api } from '@/shared/api/api'
import type { ProductStockDto } from '@audiophile/shared'


export const getProductsStock = async (productIds: string[]): Promise<ProductStockDto[]> => {
    const { data } = await api.post<ProductStockDto[]>('/api/products/stock', { productIds })

    return data
}