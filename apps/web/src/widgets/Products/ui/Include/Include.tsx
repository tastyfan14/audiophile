import cls from './Include.module.scss'
import type { ProductIncludeProps } from '../../model/types'

export default function Include({ includes }: ProductIncludeProps) {
    return (
        <div className={cls.include}>
            <h2 className={cls['include__title']}>In the box</h2>

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