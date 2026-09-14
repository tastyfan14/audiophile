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
                    <ul className={clsx(cls['selected-items'])}>
                        <li
                        key={FirstItem.id}
                        className={cls['selected-item']}
                        >
                            <Button
                            as='link'
                            href={`${ROUTES[FirstItem.category as keyof typeof ROUTES].route}/${FirstItem.slug}`}
                            variant='empty'
                            className={cls['selected-item__link']}
                            >
                                <ResponsiveImage
                                mobile={`/images/mobile/products/image-${FirstItem.image}`}
                                alt=''
                                className={cls['selected-item__picture']}
                                loading='lazy'
                                />
                            </Button>

                            <div className={cls['selected__overview']}>
                                <h3 className={cls['selected-item__overview--title']}>{FirstItem.shortTitle}</h3>
                                <p className={cls['selected-item__overview--price']}>$ {FirstItem.price.toLocaleString('en-US')}</p>
                            </div>

                            <span className={clsx(cls['selected-item__quantity'])}>x{FirstItem.quantity}</span>
                        </li>
                    </ul>
                ) : (
                    <ul className={clsx(cls['selected-items'])}>
                        {items.map((item) => {
                            return (
                                <li
                                key={item.id}
                                className={cls['selected-item']}
                                >
                                    <Button
                                    as='link'
                                    href={`${ROUTES[item.category as keyof typeof ROUTES].route}/${item.slug}`}
                                    variant='empty'
                                    className={cls['selected-item__link']}
                                    >
                                        <ResponsiveImage
                                        mobile={`/images/mobile/products/image-${item.image}`}
                                        alt=''
                                        className={cls['selected-item__picture']}
                                        loading='lazy'
                                        />
                                    </Button>

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
                                        <span className={clsx(cls['selected-item__quantity'])}>x{item.quantity}</span>
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