'use client'

import ProductCard from '@/entities/product/ui/ProductCard'
import cls from './List.module.scss'
import type { ProductListProps } from '../../model/types'
import type { ProductDto } from '@audiophile/shared'
import { useProducts } from '@/entities/product/model/useProducts'

export default function List({ category }: ProductListProps) {
    const {
        data: products = [],
        isLoading,
        isError,
    } = useProducts(category)

    if (isLoading) {
        return <p className={cls['list__state']}>Loading...</p>
    }

    if (isError) {
        return <p className={cls['list__state']}>Failed to load products.</p>
    }

    if (!products?.length) {
        return <p className={cls['list__state']}>No products found.</p>
    }

    return (
        <ul className={cls.list} aria-label='Product list'>
            {products.map((product: ProductDto, index: number) => {
                return (
                    <ProductCard
                    key={product.id}
                    product={product}
                    reverse={index % 2 !== 0}
                    />
                )
            })}
        </ul>
    )
}