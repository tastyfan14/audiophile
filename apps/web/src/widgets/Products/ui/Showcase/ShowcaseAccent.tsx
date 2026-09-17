import type { ProductShowcase } from '@/entities/product/model/types'
import IShowcaseCircle from '@/shared/assets/icons/IShowcaseCircle'
import Button from '@/shared/ui/Button'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import cls from './Showcase.module.scss'
import clsx from 'clsx'
import { ROUTES } from '@/shared/config/constants'

export default function ShowcaseAccent({ item }: { item: Extract<ProductShowcase, { variant: 'accent' }> }) {
    return (
        <article className={clsx(cls['showcase-item'], cls['showcase-item__accent'])}>
            <IShowcaseCircle className={cls['showcase-item__accent--circle']} />

            <ResponsiveImage
            mobile={`/images/mobile/products/showcase-${item.image}`}
            laptop={`/images/laptop/products/showcase-${item.image}`}
            desktop={`/images/desktop/products/showcase-${item.image}`}
            alt=''
            className={clsx(cls['showcase-item__picture'], cls['showcase-item__picture--accent'])}
            loading='lazy'
            />

            <div className={cls['showcase-item__accent--content']}>
                <h2 className={clsx(cls['showcase-item__title'], cls['showcase-item__title--accent'])}>{item.title}</h2>

                <p className={clsx(cls['showcase-item__desc'], cls['showcase-item__desc--accent'])}>{item.desc}</p>

                <Button
                as='link'
                href={`${ROUTES[item.category as keyof typeof ROUTES].route}/${item.slug}`}
                variant='secondary-inverted'
                className={cls['showcase-item__button']}
                aria-label={`See ${item.title} product`}
                >
                    See Product
                </Button>
            </div>
        </article>
    )
}