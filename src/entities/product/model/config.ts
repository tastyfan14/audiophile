import { ROUTES } from '@/shared/config/constants'
import type { ProductShowcase } from './types'

// Showcase

export const PRODUCT_SHOWCASE_VARIANTS = {
    accent: 'accent',
    default: 'default',
    double: 'double',
} as const

export const PRODUCT_SHOWCASE = [
    {
        id: 'zx9-speaker-showcase',
        slug: 'zx9',
        category: ROUTES.speakers.slug,
        title: 'ZX9 SPEAKER',
        desc: 'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
        image: 'zx9-speakers.png',
        variant: PRODUCT_SHOWCASE_VARIANTS.accent,
    },
    {
        id: 'zx7-speaker-showcase',
        slug: 'zx7',
        category: ROUTES.speakers.slug,
        title: 'ZX7 SPEAKER',
        image: 'zx7-speakers.jpg',
        variant: PRODUCT_SHOWCASE_VARIANTS.default,
    },
    {
        id: 'yx1-earphones-showcase',
        slug: 'yx1',
        category: ROUTES.earphones.slug,
        title: 'YX1 EARPHONES',
        image: 'yx1-earphones.jpg',
        variant: PRODUCT_SHOWCASE_VARIANTS.double,
    },
] satisfies ProductShowcase[]