'use client'

import cls from './ProductCard.module.scss'
import clsx from 'clsx'
import { ROUTES } from '@/shared/config/constants'
import type { Product } from '@/entities/product/model/types'
import ProductBadge from '../ProductBadge'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import Button from '@/shared/ui/Button'

type ProductCardProps = {
    product: Pick<Product, 'id' | 'slug' | 'category' | 'badges' | 'image' | 'title' | 'desc'>
    reverse?: boolean
}

export default function ProductCard({ product, reverse = false }: ProductCardProps) {
    return (
        <li className={clsx(cls['product-card'], {[cls.reverse]: reverse})}>
            <ResponsiveImage
            mobile={`/images/mobile/products/preview-${product.image}`}
            laptop={`/images/laptop/products/preview-${product.image}`}
            desktop={`/images/desktop/products/preview-${product.image}`}
            alt=''
            className={cls['product-card__picture']}
            loading='lazy'
            />

            <div className={cls['product-card__overview']}>
                <ProductBadge badges={product.badges} />

                <h2 className={cls['product-card__overview--title']}>{product.title}</h2>
                <p className={cls['product-card__overview--desc']}>{product.desc}</p>

                <Button
                as='link'
                href={`${ROUTES[product.category as keyof typeof ROUTES].route}/${product.slug}`}
                variant='primary'
                >
                    See Product
                </Button>
            </div>
        </li>
    )
}