'use client'

import { usePathname } from 'next/navigation'

export function useScrollToTop() {
    const pathname = usePathname()

    return (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== href) return

        event.preventDefault()

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}