import type { ProductShowcase } from '@/entities/product/model/types'
import Button from '@/shared/ui/Button'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import cls from './Showcase.module.scss'
import clsx from 'clsx'
import { ROUTES } from '@/shared/config/constants'

export default function ShowcaseDouble({ item }: { item: Extract<ProductShowcase, { variant: 'double' }> }) {
    return (
        <article className={clsx(cls['showcase-item'], cls['showcase-item__double'])}>
            <ResponsiveImage
            mobile={`/images/mobile/products/showcase-${item.image}`}
            laptop={`/images/laptop/products/showcase-${item.image}`}
            desktop={`/images/desktop/products/showcase-${item.image}`}
            alt=''
            className={clsx(cls['showcase-item__picture'], cls['showcase-item__picture--double'])}
            loading='lazy'
            />

            <div className={cls['showcase-item__double--content']}>
                <h2 className={cls['showcase-item__title']}>{item.title}</h2>

                <Button
                as='link'
                href={`${ROUTES[item.category as keyof typeof ROUTES].route}/${item.slug}`}
                variant='secondary'
                className={cls['showcase-item__button']}
                aria-label={`See ${item.title} product`}
                >
                    See Product
                </Button>
            </div>
        </article>
    )
}