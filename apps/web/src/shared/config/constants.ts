// client url

export const SITE_URL = 'https://audiophile-web-space.vercel.app'

// tsx breakpoint

export const BREAKPOINTS = {
    Mobile: 375,
    MobileIn: 327,
    Laptop: 768,
    LaptopIn: 689,
    Desktop: 1440,
    DesktopIn: 1110,

    PreLaptop: 512, // Calculation formula: / 3, x 2
    PostMobile: 437, // Calculation formula: / 3, / 2, x 7 - 0.5
} as const

// links

export const SOCIAL_LINKS = {
    Facebook: 'https://www.facebook.com',
    Twitter: 'https://twitter.com',
    Instagram: 'https://www.instagram.com',
} as const

// route

const PRODUCTS = '/products'

export const ROUTES = {
    home: {
        id: 'home',
        slug: 'home',
        route: '/',
        label: 'HOME',
    },
    products: {
        id: 'products',
        slug: 'products',
        route: PRODUCTS,
        label: 'PRODUCTS',
    },
    headphones: {
        id: 'headphones',
        slug: 'headphones',
        route: `${PRODUCTS}/headphones`,
        label: 'HEADPHONES',
    },
    speakers: {
        id: 'speakers',
        slug: 'speakers',
        route: `${PRODUCTS}/speakers`,
        label: 'SPEAKERS',
    },
    earphones: {
        id: 'earphones',
        slug: 'earphones',
        route: `${PRODUCTS}/earphones`,
        label: 'EARPHONES',
    },
    checkout: {
        id: 'checkout',
        slug: 'checkout',
        route: '/checkout',
        label: 'CHECKOUT',
    },
} as const

export const CATEGORY_NAVIGATION = [
    {
        // headphones
        id: ROUTES.headphones.id,
        slug: ROUTES.headphones.slug,
        route: ROUTES.headphones.route,
        image: 'category-headphones.png',
        title: ROUTES.headphones.label,
    },
    {
        // speakers
        id: ROUTES.speakers.id,
        slug: ROUTES.speakers.slug,
        route: ROUTES.speakers.route,
        image: 'category-speakers.png',
        title: ROUTES.speakers.label,
    },
    {
        // earphones
        id: ROUTES.earphones.id,
        slug: ROUTES.earphones.slug,
        route: ROUTES.earphones.route,
        image: 'category-earphones.png',
        title: ROUTES.earphones.label,
    },
] as const