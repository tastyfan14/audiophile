import type { OverlayProps } from './types'
import clsx from 'clsx'
import cls from './Overlay.module.scss'

export default function Overlay({ isOpen, onClose, className, children }: OverlayProps) {
    if (!isOpen) return null

    return (
        <div className={cls.overlay}>
            <button
            type='button'
            className={cls['overlay__backdrop']}
            aria-label='Close'
            onClick={onClose}
            />

            <div className={clsx(cls['overlay__content'], className)}>
                {children}
            </div>
        </div>
    )
}