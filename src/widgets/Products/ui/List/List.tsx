import ProductCard from '@/entities/product/ui/ProductCard'
import cls from './List.module.scss'
import type { Product } from '@/entities/product/model/types'

type Props = {
    products: Product[]
}

export default async function List({ products }: Props) {
    return (
        <ul className={cls.list}>
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