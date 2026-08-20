import clsx from 'clsx'
import cls from './Label.module.scss'
import type { LabelProps } from './types'

export default function Label({ title, variant, className, children, errorMessage, errorId, ...props }: LabelProps) {
    return (
        <label
        className={clsx(
            cls['label'],
            variant === 'in' && cls['label__in'],
            variant === 'out' && cls['label__out'],
            className
        )}
        {...props}
        >
            {errorMessage ? (
                <>
                    <div className={cls['label__overview']}>
                        <span className={clsx(cls['label__title'], cls['label__title--error'])}>{title}</span>
                        <span id={`error-${errorId}`} className={cls['label__error']}>{errorMessage}</span>
                    </div>
                    {children}
                </>
            ) : (
                <>
                    <span className={cls['label__title']}>{title}</span>
                    {children}
                </>
            )}
        </label>
    )
}