import type { ProductBadgeProps } from '../../model/types'
import cls from './ProductBadge.module.scss'

export default function ProductBadge({ badges, stock }: ProductBadgeProps) {
    return (
        <ul className={cls['product-badge']}>
            {stock <= 50
            ? (
                <span className={cls['product-badge__stock']}>Only {stock} left</span>
            ) : (
                <span className={cls['product-badge__stock']}>Out of stock</span>
            )}

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