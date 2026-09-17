'use client'

import { useState } from 'react'
import cls from './Page.module.scss'
import { useCartStore } from '@/entities/cart/model/store'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import Button from '@/shared/ui/Button'
import Counter from '@/shared/ui/Counter'
import ProductBadge from '@/entities/product/ui/ProductBadge'
import ProductFeature from '../Feature/Feature'
import ProductGallery from '../Gallery/Gallery'
import ProductInclude from '../Include/Include'
import { useRouter } from 'next/navigation'
import type { ProductPageProps } from '../../model/types'

export default function Page({ product }: ProductPageProps) {
    const [quantity, setQuantity] = useState(1)

    const addItem = useCartStore(state => state.addItem)

    const outOfStock = product.stock === 0

    const router = useRouter()

    return (
        <section className={cls.page}>
            <Button
            variant='additional'
            className={cls['page__back']}
            onClick={() => router.back()}
            >
                Go Back
            </Button>

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
                        <strong>
                            {product.price.toLocaleString('en-US')}
                        </strong>
                    </p>

                    <div className={cls['page-overview__interactive']}>
                        <Counter
                        value={quantity}
                        onChange={setQuantity}
                        variant='page'
                        className={outOfStock ? cls['page-overview__interactive--disabled'] : undefined}
                        />

                        <Button
                        variant='primary'
                        className={outOfStock ? cls['page-overview__interactive--disabled'] : undefined}
                        onClick={() => addItem({
                            id: product.id,
                            slug: product.slug,
                            category: product.category,
                            image: product.image,
                            shortTitle: product.shortTitle,
                            price: product.price,
                            stock: product.stock,

                            quantity: quantity,
                        })}
                        disabled={outOfStock ? true : false}
                        >
                            Add to Cart
                        </Button>
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