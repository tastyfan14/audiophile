import { LayoutProps } from '../../model/types'
import clsx from 'clsx'
import cls from './MainLayout.module.scss'

export default function MainLayout({ className, children }: LayoutProps) {
    return (
        <main className={clsx(cls['main-layout'], className)}>
            {children}
        </main>
    )
}