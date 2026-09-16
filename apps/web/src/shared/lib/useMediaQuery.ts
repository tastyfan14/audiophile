'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: number) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(String(query))

        const handleChange = () => {
            setMatches(mediaQuery.matches)
        }

        handleChange()

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [query])

    return matches
}