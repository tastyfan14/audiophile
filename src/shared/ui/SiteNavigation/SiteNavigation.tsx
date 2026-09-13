import clsx from 'clsx'
import cls from './SiteNavigation.module.scss'
import { ROUTES } from '@/shared/config/constants'
import Link from 'next/link'

export default function SiteNavigation({ className }: { className?: string }) {
    return (
        <nav
        className={clsx(cls.navigation, className)}
        aria-label='Site navigation'
        >
            <ul>
                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.home.route}>{ROUTES.home.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.headphones.route}>{ROUTES.headphones.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.speakers.route}>{ROUTES.speakers.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.earphones.route}>{ROUTES.earphones.label}</Link>
                </li>
            </ul>
        </nav>
    )
}