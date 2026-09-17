import cls from './Feature.module.scss'
import type { ProductFeatureProps } from '../../model/types'

export default function Feature({ features }: ProductFeatureProps) {
    return (
        <div className={cls.feature}>
            <h2 className={cls['feature__title']}>Features</h2>

            {features.map((feature) => {
                return (
                    <p
                    key={feature.id}
                    className={cls['feature__desc']}
                    >
                        {feature.desc}
                    </p>
                )
            })}
        </div>
    )
}