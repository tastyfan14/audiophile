import clsx from 'clsx'
import cls from './Burger.module.scss'
import { FocusTrap } from 'focus-trap-react'
import { useEffect } from 'react'
import { useLockBodyScroll } from '@/shared/lib/useLockBodyScroll'
import type { BurgerProps } from './types'
import Container from '@/shared/ui/Layout/ui/Container'

export default function Burger({ isOpen, onClose, className, children }: BurgerProps) {
    useLockBodyScroll(isOpen)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEscape)
        
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])
    return (
        <FocusTrap
        active={isOpen}
        focusTrapOptions={{
            returnFocusOnDeactivate: true,
            clickOutsideDeactivates: true,
        }}
        >
            <div
            id='burger'
            className={clsx(cls.burger, className)}
            role='dialog'
            aria-modal='true'
            >
                <Container>
                    {children}
                </Container>
            </div>
        </FocusTrap>
    )
}