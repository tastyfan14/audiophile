'use client'

import { useState } from 'react'
import type { Product } from '@/entities/product/model/types'
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

type Props = {
    product: Product
}

export default function Page({ product }: Props) {
    const [quantity, setQuantity] = useState(1)

    const addItem = useCartStore(state => state.addItem)

    const isStock = product.stock > 0

    const router = useRouter()

    return (
        <section className={cls['page-wrapper']}>
            <Button
            variant='additional'
            className={cls['page__button']}
            onClick={() => router.back()}
            >
                Go Back
            </Button>

            <div className={cls.page}>
                <div className={cls['page-content']}>
                    <ResponsiveImage
                    mobile={`/images/mobile/products/image-${product.image}`}
                    laptop={`/images/laptop/products/image-${product.image}`}
                    desktop={`/images/desktop/products/image-${product.image}`}
                    alt=''
                    className={cls['page-content__picture']}
                    />

                    {product.badges.length > 0 && (
                        <div
                        className={cls['page-content__badges']}
                        >
                            {!isStock && <span className={cls['page-content__badges--stock']}>Out of stock</span>}

                            <ProductBadge badges={product.badges.slice(0, 7)}  />
                        </div>
                    )}

                    <h1 className={cls['page-content__title']}>{product.title}</h1>

                    <p className={cls['page-content__desc']}>{product.desc}</p>

                    <p className={cls['page-content__price']}>$ 
                        <strong>
                            {product.price.toLocaleString('en-US')}
                        </strong>
                    </p>

                    <div className={cls['page-content__interactive']}>
                        <Counter
                        value={quantity}
                        onChange={setQuantity}
                        variant='page'
                        className={cls['page-content__interactive--counter']}
                        />

                        <Button
                        variant='primary'
                        className={!isStock ? cls['page-content__interactive--disabled'] : undefined}
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
                        disabled={!isStock}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>

                <div className={cls['page-content__shortly']}>
                    <ProductFeature features={product.features} />

                    <ProductInclude includes={product.includes} />
                </div>

                <ProductGallery images={product.gallery} />
            </div>
        </section>
    )
}