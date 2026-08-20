import type { ButtonProps } from './types'
import cls from './Button.module.scss'
import clsx from 'clsx'
import Spinner from '@/shared/ui/Spinner'
import Link from 'next/link'
import IButtonRightArrow from '@/shared/assets/icons/IButtonRightArrow'

export default function Button(props: ButtonProps) {
    if (props.as === 'link') {
        const { as: _as, variant, className, href, children, ...linkProps } = props

        return (
            <Link
            className={clsx(cls[variant], className, cls['link'])}
            href={href}
            {...linkProps}
            >
                {children}
            </Link>
        )
    }

    const { as: _as, variant, className, leftIcon: LeftIcon, rightIcon: RightIcon, fullWidth, loading, children, ...btnProps } = props

    const content = loading ? (
        <Spinner />
    ) : variant === 'icon' ? (
        children
    ) : (
        <>
            {variant === 'tertiary' ? (
                <>
                    {children}
                    <IButtonRightArrow className={cls['button__icon--arrow']} />
                </>
            ) : (
                <>
                    {LeftIcon && <LeftIcon className={cls['button__icon']} />}
                    {children}
                    {RightIcon && <RightIcon className={cls['button__icon']} />}
                </>
            )}
        </>
    )

    return (
        <button
        className={clsx(cls[variant], fullWidth && cls.full, className)}
        aria-busy={loading}
        disabled={loading}
        {...btnProps}
        >
            {content}
        </button>
    )
}