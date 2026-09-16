import clsx from 'clsx'
import cls from './Include.module.scss'
import type { ProductIncludeProps } from '../../model/types'

export default function Include({ includes, className }: ProductIncludeProps) {
    return (
        <div className={clsx(cls['include'], className)}>
            <h2 className={cls['include__title']}>in the box</h2>

            <div className={cls['include__cards']}>
                {includes.map((include) => {
                    return (
                        <div key={include.id} className={cls['include__card']}>
                            <span className={cls['include__card--quantity']}>{include.quantity}x</span>
                            <span className={cls['include__card--item']}>{include.title}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}