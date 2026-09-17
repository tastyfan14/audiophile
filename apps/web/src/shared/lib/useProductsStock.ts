'use client'

import { getProductsStock } from '@/entities/product/api/getProductsStock'
import { useQuery } from '@tanstack/react-query'

export function useProductsStock(productsIds: string[]) {
    return useQuery({
        queryKey: ['products-stock', productsIds],
        queryFn: () => getProductsStock(productsIds),
        enabled: productsIds.length > 0,
        refetchInterval: 30000,
    })
}