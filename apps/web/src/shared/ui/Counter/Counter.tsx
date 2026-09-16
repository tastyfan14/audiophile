import type { CounterProps } from './types'
import cls from './Counter.module.scss'
import Button from '../Button'
import clsx from 'clsx'

export default function Counter({ value, onChange, variant, className }: CounterProps) {
    const decrement = () => onChange(Math.max(0, value - 1))
    const increment = () => onChange(value + 1)
    return (
        <div className={clsx(cls.counter, cls[`counter-${variant}`], className)}>
            <Button
            variant='additional'
            className={cls['counter__button']}
            disabled={variant === 'cart' ? value === 0 : value === 1}
            aria-label='Decrease quantity'
            onClick={decrement}
            >
                -
            </Button>

            <span aria-live='polite' className={cls[`counter-${variant}__value`]}>{value}</span>

            <Button
            variant='additional'
            className={cls['counter__button']}
            disabled={value === 999}
            aria-label='Increase quantity'
            onClick={increment}
            >
                +
            </Button>
        </div>
    )
}