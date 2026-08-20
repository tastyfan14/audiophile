import type { InputProps } from './types'
import cls from './Input.module.scss'
import clsx from 'clsx'
import Label from '../Label'

export default function Input({ title, rightEl: Right, leftEl: Left, className, errorMessage, errorId, ...props }: InputProps) {
    return (
        <Label
        variant='in'
        title={title}
        errorId={errorId}
        errorMessage={errorMessage}
        >
            <div className={clsx(cls['input'], className)}>
                {Right && <Right aria-hidden='true' className={cls['input__icon']} />}

                <input
                aria-describedby={errorMessage ? `error-${errorId}` : undefined}
                {...props}
                />

                {Left && <Left aria-hidden='true' className={cls['input__icon']} />}
            </div>
        </Label>
    )
}