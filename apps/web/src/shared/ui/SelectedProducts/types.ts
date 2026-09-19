import { ProductStockDto } from '@audiophile/shared'

export type SelectedProductsProps = {
    variant: 'cart' | 'summary' | 'overlay' | 'overlay--single'
    currentStock: ProductStockDto[] | undefined
}