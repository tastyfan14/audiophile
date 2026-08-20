import { LayoutProps } from '../../model/types'
import clsx from 'clsx'
import cls from './AppLayout.module.scss'

export default function AppLayout({ className, children }: LayoutProps) {
    return (
        <div className={clsx(cls['app-layout'], className)}>
            {children}
        </div>
    )
}