import clsx from 'clsx'
import type { ProductBadgeProps } from '../../model/types'
import cls from './ProductBadge.module.scss'

export default function ProductBadge({ badges, stock, className }: ProductBadgeProps) {
    return (
        <ul className={clsx(cls['product-badge'], className)}>
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