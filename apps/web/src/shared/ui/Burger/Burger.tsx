import clsx from 'clsx'
import cls from './Burger.module.scss'
import { FocusTrap } from 'focus-trap-react'
import type { BurgerProps } from './types'
import Container from '@/shared/ui/Layout/ui/Container'
import { useEscapeKey } from '@/shared/lib/useEscapeKey'

export default function Burger({ isOpen, onClose, className, children }: BurgerProps) {
    useEscapeKey({ isOpen, onClose })

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