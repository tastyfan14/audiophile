'use client'

import cls from './Footer.module.scss'
import { SOCIAL_LINKS } from '@/shared/config/constants'
import Button from '@/shared/ui/Button'
import ILogo from '@/shared/assets/icons/ILogo'
import IFacebook from '@/shared/assets/icons/IFacebook'
import ITwitter from '@/shared/assets/icons/ITwitter'
import IInstagram from '@/shared/assets/icons/IInstagram'
import Navigation from '@/shared/ui/SiteNavigation'
import Container from '@/shared/ui/Layout/ui/Container'

export default function Footer() {
    return (
        <footer className={cls.footer}>
            <Container className={cls['footer__container']}>
                <span className={cls['footer__line']} aria-hidden='true' />

                <ILogo className={cls['footer__logo']} aria-hidden='true' />

                <Navigation className={cls['footer__navigation']} />

                <p className={cls['footer__desc']}>{`Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.`}</p>
                <p className={cls['footer__copyright']}>Copyright 2021. All Rights Reserved</p>

                <div className={cls['footer__socials']}>
                    <Button
                    as='link'
                    href={SOCIAL_LINKS.Facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    variant='icon'
                    className={cls['footer__socials--icon']}
                    aria-label='Facebook'
                    >
                        <IFacebook aria-hidden='true' />
                    </Button>

                    <Button
                    as='link'
                    href={SOCIAL_LINKS.Twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                    variant='icon'
                    className={cls['footer__socials--icon']}
                    aria-label='Twitter'
                    >
                        <ITwitter aria-hidden='true' />
                    </Button>

                    <Button
                    as='link'
                    href={SOCIAL_LINKS.Instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    variant='icon'
                    className={cls['footer__socials--icon']}
                    aria-label='Instagram'
                    >
                        <IInstagram aria-hidden='true' />
                    </Button>
                </div>
            </Container>
        </footer>
    )
}