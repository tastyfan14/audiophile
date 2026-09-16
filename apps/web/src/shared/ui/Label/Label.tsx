import clsx from 'clsx'
import cls from './Label.module.scss'
import type { LabelProps } from './types'

export default function Label({ title, className, children, errorMessage, errorId, ...props }: LabelProps) {
    return (
        <label
        className={clsx(
            cls['label'],
            className
        )}
        {...props}
        >
            {errorMessage && errorMessage !== 'none' ? (
                <>
                    <div className={cls['label__overview']}>
                        {title && <span className={clsx(cls['label__title'], cls['label__title--error'])}>{title}</span>}
                        <span id={`error-${errorId}`} className={cls['label__error']}>{errorMessage}</span>
                    </div>
                    {children}
                </>
            ) : (
                <>
                    {title && <span className={cls['label__title']}>{title}</span>}
                    {children}
                </>
            )}
        </label>
    )
}