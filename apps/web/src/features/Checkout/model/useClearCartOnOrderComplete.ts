'use client'

import { useCartStore } from '@/entities/cart/model/store'
import { useEffect } from 'react'

export function useClearCartOnOrderComplete(isOrderCompleted: boolean) {
    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => {
        if (!isOrderCompleted) return

        const handlePageHide = () => {
            clearCart()
        }

        window.addEventListener('pagehide', handlePageHide)

        return () => {
            window.removeEventListener('pagehide', handlePageHide)
            clearCart()
        }
    }, [isOrderCompleted, clearCart])
}