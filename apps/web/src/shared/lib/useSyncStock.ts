'use client'

import { getProductsStock } from '@/entities/product/api/getProductsStock'
import type { ProductStockDto } from '@/entities/product/api/types'
import { useCallback, useState } from 'react'

export function useSyncStock() {
    const [isSyncing, setIsSyncing] = useState(false)

    const syncStock = useCallback(async (productIds: string[]): Promise<ProductStockDto[]> => {
        if (!productIds.length) {
            return []
        }

        try {
            setIsSyncing(true)

            return await getProductsStock(productIds)
        } finally {
            setIsSyncing(false)
        }
    }, [])

    return {
        isSyncing,
        syncStock
    }
}