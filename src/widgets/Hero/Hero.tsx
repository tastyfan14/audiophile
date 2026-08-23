'use client'

import clsx from 'clsx'
import cls from './Hero.module.scss'
import Button from '@/shared/ui/Button'
import Container from '@/shared/ui/Layout/ui/Container'
import { ROUTES } from '@/shared/config/constants'

export default function Hero() {
    return (
        <section className={clsx(cls['hero'])}>
            <Container className={clsx(cls['hero__container'])}>
                <p className={clsx(cls['hero__overview--sub'])}>NEW PRODUCT</p>
                <h1 className={clsx(cls['hero__overview--title'])}>XX99 Mark II Headphones</h1>
                <p className={clsx(cls['hero__overview--desc'])}>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>

                <Button
                as='link'
                variant='primary'
                href={`${ROUTES.Headphones.route}/xx99-mark-two`}
                >
                    See Product
                </Button>
            </Container>
        </section>
    )
}