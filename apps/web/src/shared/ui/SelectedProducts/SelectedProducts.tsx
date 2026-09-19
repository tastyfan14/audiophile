import { useCartStore } from '@/entities/cart/model/store'
import clsx from 'clsx'
import cls from './SelectedProducts.module.scss'
import { ROUTES } from '@/shared/config/constants'
import ResponsiveImage from '../ResponsiveImage'
import Button from '../Button'
import Counter from '../Counter'
import { SelectedProductsProps } from './types'
import { formatPrice } from '@/shared/lib/formatPrice'

export default function SelectedProducts({ variant, currentStock }: SelectedProductsProps) {
    const items = useCartStore((state) => state.items)
    const updateQuantity = useCartStore(state => state.updateQuantity)

    const FirstItem = items[0]

    if (!FirstItem) {
        return null
    }

    const stockMap = new Map(
        currentStock?.map(product => [product.id, product.stock])
    )

    return (
        <ul className={cls['selected-items']}>
            {variant === 'overlay--single'
            ? (
                <li
                key={FirstItem.id}
                className={clsx(cls['selected-item'], cls['selected-item--single'])}
                >
                    <ResponsiveImage
                    mobile={`/images/mobile/products/image-${FirstItem.image}`}
                    alt=''
                    className={clsx(cls['selected-item__picture'], cls['selected-item__picture--single'])}
                    loading='lazy'
                    />

                    <div className={cls['selected__overview']}>
                        <h3 className={cls['selected-item__overview--title']}>{FirstItem.shortTitle}</h3>
                        <p className={cls['selected-item__overview--price']}>$ {formatPrice(FirstItem.price)}</p>
                    </div>

                    <span className={clsx(cls['selected-item__quantity'], cls['selected-item__quantity--single'])}>x{FirstItem.quantity}</span>
                </li>
            ) : (
                <>
                    {items.map((item) => {
                        const stock = stockMap.get(item.id)

                        return (
                            <li
                            key={item.id}
                            className={clsx(
                                cls['selected-item'],
                                variant === 'overlay' && cls['selected-item--overlay'],
                                variant === 'summary' && cls['selected-item--summary'],
                                stock === 0 || stock !== undefined && stock <= 50 && cls['selected-item--stock']
                            )}
                            >
                                {variant === 'cart' && stock === 0
                                ? (
                                    <span className={cls['selected-item__stock']}>Out of stock</span>
                                ) : variant === 'cart' && stock !== undefined && stock <= 50 ? (
                                    <span className={cls['selected-item__stock']}>Only {stock} left</span>
                                ) : (
                                    undefined
                                )}

                                {variant === 'overlay'
                                    ? (
                                        <ResponsiveImage
                                        mobile={`/images/mobile/products/image-${item.image}`}
                                        alt={`${item.shortTitle} product`}
                                        className={clsx(cls['selected-item__picture'], cls['selected-item__picture--overlay'])}
                                        loading='lazy'
                                        />
                                    ) : (
                                        <Button
                                        as='link'
                                        href={`${ROUTES[item.category as keyof typeof ROUTES].route}/${item.slug}`}
                                        variant='empty'
                                        className={cls['selected-item__link']}
                                        >
                                            <ResponsiveImage
                                            mobile={`/images/mobile/products/image-${item.image}`}
                                            alt={`${item.shortTitle} product`}
                                            className={cls['selected-item__picture']}
                                            loading='lazy'
                                            />
                                        </Button>
                                    )
                                }

                                <div className={cls['selected__overview']}>
                                    <h3 className={cls['selected-item__overview--title']}>{item.shortTitle}</h3>
                                    <p className={cls['selected-item__overview--price']}>$ {formatPrice(item.price)}</p>
                                </div>

                                {variant === 'cart' ? (
                                    <Counter
                                    value={item.quantity}
                                    onChange={(quantity) => updateQuantity(item.id, quantity)}
                                    variant='cart'
                                    className={clsx(cls['selected-item__counter'], variant === 'cart' && stock !== undefined && stock <= 50 && cls['selected-item__counter--stock'])}
                                    />
                                ) : (
                                    <span className={clsx(cls['selected-item__quantity'], variant === 'summary' && cls['selected-item__quantity--other'])}>x{item.quantity}</span>
                                )}
                            </li>
                        )
                    })}
                </>
            )
            }
        </ul>
    )
}