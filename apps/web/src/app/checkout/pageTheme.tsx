'use client'

import { useEffect } from 'react'

export default function PageTheme() {
    useEffect(() => {
        document.body.style.background = '#F1F1F1'

        return () => {
            document.body.style.background = ''
        }
    })

    return null
}