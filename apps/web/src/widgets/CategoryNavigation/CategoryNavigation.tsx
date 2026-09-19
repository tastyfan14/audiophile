'use client'

import IButtonRightArrow from '@/shared/assets/icons/IButtonRightArrow'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import Button from '@/shared/ui/Button'
import clsx from 'clsx'
import cls from './CategoryNavigation.module.scss'
import clsButton from '@/shared/ui/Button/Button.module.scss'
import { CATEGORY_NAVIGATION } from '@/shared/config/constants'
import { useScrollToTop } from '@/shared/lib/useScrollToTop'

export default function CategoryNavigation({ variant }: { variant: 'page' | 'menu' }) {
    const scrollToTop = useScrollToTop()

    return (
        <nav
        className={clsx(cls['category-navigation'], cls[`category-navigation__${variant}`])}
        aria-label='Product categories'
        >
            {CATEGORY_NAVIGATION.map((category) => {
                return (
                    <Button
                    key={category.id}
                    as='link'
                    variant='additional'
                    href={category.route}
                    onClick={(e) => scrollToTop(category.route, e)}
                    className={cls['category-navigation__card']}
                    >
                        <ResponsiveImage
                        mobile={`/images/desktop/category-navigation/${category.image}`}
                        alt=''
                        aria-hidden='true'
                        className={clsx(cls['category-navigation__picture'], cls[`category-navigation__picture--${category.slug}`])}
                        loading='lazy'
                        />

                        <div className={cls['category-navigation__overview']}>
                            <h2 className={cls['category-navigation__overview--title']}>{category.title}</h2>
                            <span aria-hidden='true' className={clsx(clsButton.tertiary, cls['category-navigation__overview--button'])}>Shop <IButtonRightArrow /></span>
                        </div>
                    </Button>
                )
            })}
        </nav>
    )
}