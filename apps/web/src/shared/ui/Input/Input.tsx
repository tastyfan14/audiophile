import type { InputProps } from './types'
import cls from './Input.module.scss'
import clsx from 'clsx'

export default function Input({ rightEl: Right, leftEl: Left, className, errorId, ...props }: InputProps) {
    const describedby = props['aria-invalid'] ? `error-${errorId}` : undefined

    return (
        <>
            {!Right && !Left ? (
                <input
                {...props}
                className={clsx(cls['input'], className)}
                aria-describedby={describedby}
                />
            ) : (
                <div className={clsx(cls['input__wrapper'], className)}>
                    {Right && <Right aria-hidden='true' className={cls['input__wrapper--icon']} />}

                    <input
                    {...props}
                    aria-describedby={describedby}
                    />

                    {Left && <Left aria-hidden='true' className={cls['input__wrapper--icon']} />}
                </div>
            )}
        </>
    )
}