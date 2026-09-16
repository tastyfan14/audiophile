import type { OverlayProps } from './types'
import clsx from 'clsx'
import cls from './Overlay.module.scss'
import { useLockBodyScroll } from '@/shared/lib/useLockBodyScroll'

export default function Overlay({ isOpen, onClose, className, coverage, children }: OverlayProps) {
    useLockBodyScroll(isOpen)

    if (!isOpen) return null

    return (
        <div className={clsx(cls.overlay, cls[`overlay-${coverage}`])}>
            <button
            type='button'
            className={clsx(cls['overlay__backdrop'], cls[`overlay-${coverage}__backdrop`])}
            aria-label='Close'
            onClick={onClose}
            />

            <div className={clsx(cls['overlay__content'], className)}>
                {children}
            </div>
        </div>
    )
}