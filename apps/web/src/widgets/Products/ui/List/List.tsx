import ProductCard from '@/entities/product/ui/ProductCard'
import cls from './List.module.scss'
import type { ProductListProps } from '../../model/types'

export default async function List({ products }: ProductListProps) {
    return (
        <ul className={cls.list} aria-label='Product list'>
            {products.map((product, index) => {
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