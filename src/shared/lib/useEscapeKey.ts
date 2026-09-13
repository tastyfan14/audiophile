'use client'

import { useEffect } from 'react'

type Props = {
    isOpen: boolean
    onClose: () => void
}

export function useEscapeKey({ isOpen, onClose }: Props) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEscape)

        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])
}