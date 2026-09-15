import { useCartStore } from '@/entities/cart/model/store'
import clsx from 'clsx'
import cls from './SelectedProducts.module.scss'
import { ROUTES } from '@/shared/config/constants'
import ResponsiveImage from '../ResponsiveImage'
import Button from '../Button'
import Counter from '../Counter'
import { SelectedProductsProps } from './types'

export default function SelectedProducts({ variant }: SelectedProductsProps) {
    const items = useCartStore((state) => state.items)
    const updateQuantity = useCartStore(state => state.updateQuantity)

    const FirstItem = items[0]

    return (
        <>
            {variant === 'first'
                ? (
                    <ul className={clsx(cls['selected-items'], cls['selected-items--first'])}>
                        <li
                        key={FirstItem.id}
                        className={clsx(cls['selected-item'], variant === 'first' && cls['selected-item--first'])}
                        >
                            <ResponsiveImage
                            mobile={`/images/mobile/products/image-${FirstItem.image}`}
                            alt=''
                            className={clsx(cls['selected-item__picture'], cls['selected-item__picture--overlay'])}
                            loading='lazy'
                            />

                            <div className={cls['selected__overview']}>
                                <h3 className={cls['selected-item__overview--title']}>{FirstItem.shortTitle}</h3>
                                <p className={cls['selected-item__overview--price']}>$ {FirstItem.price.toLocaleString('en-US')}</p>
                            </div>

                            <span className={clsx(cls['selected-item__quantity'], cls['selected-item__quantity--overlay'])}>x{FirstItem.quantity}</span>
                        </li>
                    </ul>
                ) : (
                    <ul
                    className={clsx(
                        cls['selected-items'],
                        variant === 'summary' && cls['selected-items--summary'],
                        variant === 'overlay' && cls['selected-items--overlay']
                    )}
                    >
                        {items.map((item) => {
                            return (
                                <li
                                key={item.id}
                                className={clsx(cls['selected-item'], variant === 'overlay' && cls['selected-item--overlay'])}
                                >
                                    {variant === 'overlay'
                                        ? (
                                            <ResponsiveImage
                                            mobile={`/images/mobile/products/image-${item.image}`}
                                            alt={`${item.shortTitle} product`}
                                            className={clsx(cls['selected-item__picture'], variant === 'overlay' && cls['selected-item__picture--overlay'])}
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
                                        <p className={cls['selected-item__overview--price']}>$ {item.price.toLocaleString('en-US')}</p>
                                    </div>

                                    {variant === 'cart' ? (
                                        <Counter
                                        value={item.quantity}
                                        onChange={(quantity) => updateQuantity(item.id, quantity)}
                                        variant='cart'
                                        className={cls['selected-item__counter']}
                                        />
                                    ) : (
                                        <span className={clsx(cls['selected-item__quantity'], variant === 'overlay' && cls['selected-item__quantity--overlay'])}>x{item.quantity}</span>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                )
            }
        </>
    )
}