import type { ProductStockDto } from '@audiophile/shared'

export type CartProps = {
    currentStock: ProductStockDto[] | undefined

    isLoading: boolean
    isFetching: boolean
    isError: boolean

    isOpen: boolean
    onClose: () => void
    className?: string
}

export type CartEmptyProps = {
    onClose: () => void
}