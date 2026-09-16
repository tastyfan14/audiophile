import type { ProductBadge } from '../../model/types'
import cls from './ProductBadge.module.scss'

type ProductBadgeProps = {
    badges: ProductBadge[]
}

export default function ProductBadge({ badges }: ProductBadgeProps) {
    return (
        <ul className={cls['product-badge']}>
            {badges.map((badge, index) => {
                return (
                    <li
                    key={badge.id + index}
                    className={cls['product-badge__item']}
                    >
                        {badge.label}
                    </li>
                )
            })}
        </ul>
    )
}