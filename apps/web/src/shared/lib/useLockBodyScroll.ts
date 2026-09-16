'use client'

import { useEffect } from 'react'

let originalOverflow = ''
let lockCount = 0

export function useLockBodyScroll(isLocked: boolean) {
    useEffect(() => {
        if (!isLocked) return

        if (lockCount === 0) {
            originalOverflow = document.body.style.overflow

            document.body.style.overflow = 'hidden'
        }

        lockCount++

        document.body.style.overflow = 'hidden'

        return () => {
            lockCount--

            if (lockCount === 0) {
                document.body.style.overflow = originalOverflow
            }
        }
    }, [isLocked])
}