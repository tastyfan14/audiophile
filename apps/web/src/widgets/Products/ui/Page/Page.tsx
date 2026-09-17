'use client'

import { useState } from 'react'
import cls from './Page.module.scss'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import Counter from '@/shared/ui/Counter'
import BackToPreviousPage from '@/features/BackNavigation/ui/BackToPreviousPage'
import AddToCart from '@/features/AddToCart/ui/AddToCart'
import ProductBadge from '@/entities/product/ui/ProductBadge'
import ProductFeature from '../Feature/Feature'
import ProductGallery from '../Gallery/Gallery'
import ProductInclude from '../Include/Include'
import type { ProductPageProps } from '../../model/types'
import { formatPrice } from '@/shared/lib/formatPrice'

export default function Page({ product }: ProductPageProps) {
    const [quantity, setQuantity] = useState(1)

    return (
        <section className={cls.page}>
            <BackToPreviousPage className={cls['page__back']} />

            <div className={cls['page-content']}>
                <div className={cls['page-overview']}>
                    <ResponsiveImage
                    mobile={`/images/mobile/products/image-${product.image}`}
                    laptop={`/images/laptop/products/image-${product.image}`}
                    desktop={`/images/desktop/products/image-${product.image}`}
                    alt=''
                    className={cls['page-overview__picture']}
                    preload
                    />

                    {product.badges.length > 0 && (
                        <ProductBadge badges={product.badges} stock={product.stock} className={cls['page-overview__badges']} />
                    )}

                    <h1 className={cls['page-overview__title']}>{product.title}</h1>

                    <p className={cls['page-overview__desc']}>{product.desc}</p>

                    <p className={cls['page-overview__price']}>$
                        {' '}
                        <strong>
                            {formatPrice(product.price)}
                        </strong>
                    </p>

                    <div className={cls['page-overview__interactive']}>
                        <Counter
                        value={quantity}
                        onChange={setQuantity}
                        variant='page'
                        />

                        <AddToCart
                        product={product}
                        currentStock={product.stock}
                        currentQuantity={quantity}
                        className={cls['page-overview__interactive--disabled']}
                        />
                    </div>
                </div>

                <div className={cls['page-overview__shortly']}>
                    <ProductFeature features={product.features} />

                    <ProductInclude includes={product.includes} />
                </div>

                <ProductGallery images={product.gallery} />
            </div>
        </section>
    )
}