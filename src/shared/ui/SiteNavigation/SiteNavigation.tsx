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
                    <Link href={ROUTES.Home.route}>{ROUTES.Home.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.Headphones.route}>{ROUTES.Headphones.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.Speakers.route}>{ROUTES.Speakers.label}</Link>
                </li>

                <li className={clsx(cls['navigation__li'])}>
                    <Link href={ROUTES.Earphones.route}>{ROUTES.Earphones.label}</Link>
                </li>
            </ul>
        </nav>
    )
}