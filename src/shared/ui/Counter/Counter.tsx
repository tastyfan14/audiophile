import type { CounterProps } from './types'
import cls from './Counter.module.scss'
import Button from '../Button'
import clsx from 'clsx'

export default function Counter({ value, onChange, className }: CounterProps) {
    const decrement = () => onChange(Math.max(1, value - 1))
    const increment = () => onChange(value + 1)
    return (
        <div className={clsx(cls.counter, className)}>
            <Button
            variant='additional'
            className={cls['counter__button']}
            disabled={value === 1}
            aria-label='Decrease quantity'
            onClick={decrement}
            >
                -
            </Button>

            <span aria-live='polite' className={cls['counter__value']}>{value}</span>

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