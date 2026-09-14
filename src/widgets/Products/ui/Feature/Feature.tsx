import clsx from 'clsx'
import cls from './Feature.module.scss'
import type { ProductFeatureProps } from '../../model/types'

export default function Feature({ features, className }: ProductFeatureProps) {
    return (
        <div className={clsx(cls['feature'], className)}>
            <h2 className={cls['feature__title']}>FEATURES</h2>

            {features.map((feature) => {
                return (
                    <p key={feature.id} className={cls['feature__desc']}>{feature.desc}</p>
                )
            })}
        </div>
    )
}