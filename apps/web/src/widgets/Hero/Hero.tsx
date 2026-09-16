'use client'

import cls from './Hero.module.scss'
import Button from '@/shared/ui/Button'
import Container from '@/shared/ui/Layout/ui/Container'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import { ROUTES } from '@/shared/config/constants'

export default function Hero() {
    return (
        <section className={cls.hero}>
            <Container className={cls['hero__container']}>
                <ResponsiveImage
                mobile='/images/mobile/hero/hero.jpg'
                laptop='/images/laptop/hero/hero.jpg'
                desktop='/images/desktop/hero/hero.jpg'
                alt=''
                className={cls['hero__picture']}
                preload
                />

                <p className={cls['hero__sub']}>NEW PRODUCT</p>
                <h1 className={cls['hero__title']}>XX99 Mark II Headphones</h1>
                <p className={cls['hero__desc']}>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>

                <Button
                as='link'
                variant='primary'
                className={cls['hero__button']}
                href={`${ROUTES.headphones.route}/xx99-mark-two`}
                >
                    See Product
                </Button>
            </Container>
        </section>
    )
}