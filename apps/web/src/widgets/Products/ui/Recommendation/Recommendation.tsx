import cls from './Recommendation.module.scss'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import Button from '@/shared/ui/Button'
import { ROUTES } from '@/shared/config/constants'
import type { ProductRecommendationProps } from '../../model/types'

export default function Recommendation({ recommendations }: ProductRecommendationProps) {
    return (
        <section className={cls.recommendation} aria-labelledby='recommendations-title'>
            <h2 id='recommendations-title' className={cls['recommendation__title']}>You may also like</h2>

            <ul className={cls['recommendation__cards']}>
                {recommendations.map((recommendation) => {
                    return (
                        <li
                        key={recommendation.id}
                        className={cls['recommendation__card']}
                        >
                            <ResponsiveImage
                            mobile={`/images/mobile/products/image-${recommendation.image}`}
                            laptop={`/images/laptop/products/image-${recommendation.image}`}
                            desktop={`/images/desktop/products/image-${recommendation.image}`}
                            alt=''
                            aria-hidden='true'
                            className={cls['recommendation__card--picture']}
                            loading='lazy'
                            />

                            <h3 className={cls['recommendation__card--title']}>{recommendation.title}</h3>

                            <Button
                            as='link'
                            href={`${ROUTES[recommendation.category as keyof typeof ROUTES].route}/${recommendation.slug}`}
                            variant='primary'
                            className={cls['recommendation__card--button']}
                            aria-label={`See ${recommendation.title} product`}
                            >
                                See Product
                            </Button>
                        </li>
                    )
                }).slice(0, 3)}
            </ul>
        </section>
    )
}