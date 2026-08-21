import type { InputProps } from './types'
import cls from './Input.module.scss'
import clsx from 'clsx'

export default function Input({ rightEl: Right, leftEl: Left, className, errorId, ...props }: InputProps) {
    return (
        <>
            {!Right && !Left ? (
                <input
                className={clsx(cls['input'], className)}
                aria-describedby={errorId ? errorId : undefined}
                {...props}
                />
            ) : (
                <div className={clsx(cls['input__wrapper'], className)}>
                    {Right && <Right aria-hidden='true' className={cls['input__wrapper--icon']} />}

                    <input
                    aria-describedby={errorId ? errorId : undefined}
                    {...props}
                    />

                    {Left && <Left aria-hidden='true' className={cls['input__wrapper--icon']} />}
                </div>
            )}
        </>
    )
}