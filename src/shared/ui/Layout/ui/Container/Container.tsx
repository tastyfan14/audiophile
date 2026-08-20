import { LayoutProps } from '../../model/types'
import clsx from 'clsx'
import cls from './Container.module.scss'

export default function Container({ className, children }: LayoutProps) {
    return (
        <div className={clsx(cls['container'], className)}>
            {children}
        </div>
    )
}