import clsx from 'clsx'
import cls from './SiteNavigation.module.scss'
import Link from 'next/link'
import { ROUTES } from '@/shared/config/constants'
import { useScrollToTop } from '@/shared/lib/useScrollToTop'

export default function SiteNavigation({ className }: { className?: string }) {
    const scrollToTop = useScrollToTop()

    return (
        <nav
        className={clsx(cls.navigation, className)}
        aria-label='Site navigation'
        >
            <ul>
                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.home.route} onClick={(e) => scrollToTop(ROUTES.home.route, e)}>{ROUTES.home.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.headphones.route} onClick={(e) => scrollToTop(ROUTES.headphones.route, e)}>{ROUTES.headphones.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.speakers.route} onClick={(e) => scrollToTop(ROUTES.speakers.route, e)}>{ROUTES.speakers.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.earphones.route} onClick={(e) => scrollToTop(ROUTES.earphones.route, e)}>{ROUTES.earphones.label}</Link>
                </li>
            </ul>
        </nav>
    )
}