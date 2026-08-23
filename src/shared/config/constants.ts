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

// checkout

export const SHIPPING = 50
export const VAR_RATE = 0.2

// links

export const SOCIAL_LINKS = {
    Facebook: 'https://www.facebook.com',
    Twitter: 'https://twitter.com',
    Instagram: 'https://www.instagram.com',
} as const

// route

const PRODUCTS = '/products'

export const ROUTES = {
    Home: {
        id: 'home',
        slug: 'home',
        route: '/',
        label: 'HOME',
    },
    Products: {
        id: 'products',
        slug: 'products',
        route: PRODUCTS,
        label: 'PRODUCTS',
    },
    Headphones: {
        id: 'headphones',
        slug: 'headphones',
        route: `${PRODUCTS}/headphones`,
        label: 'HEADPHONES',
    },
    Speakers: {
        id: 'speakers',
        slug: 'speakers',
        route: `${PRODUCTS}/speakers`,
        label: 'SPEAKERS',
    },
    Earphones: {
        id: 'earphones',
        slug: 'earphones',
        route: `${PRODUCTS}/earphones`,
        label: 'EARPHONES',
    },
    Checkout: {
        id: 'checkout',
        slug: 'checkout',
        route: '/checkout',
        label: 'CHECKOUT',
    },
} as const

export const CATEGORY_NAVIGATION = [
    { // headphones
        id: ROUTES.Headphones.id,
        slug: ROUTES.Headphones.slug,
        route: ROUTES.Headphones.route,
        image: 'category-headphones.png',
        title: ROUTES.Headphones.label,
    },
    { // speakers
        id: ROUTES.Speakers.id,
        slug: ROUTES.Speakers.slug,
        route: ROUTES.Speakers.route,
        image: 'category-speakers.png',
        title: ROUTES.Speakers.label,
    },
    { // earphones
        id: ROUTES.Earphones.id,
        slug: ROUTES.Earphones.slug,
        route: ROUTES.Earphones.route,
        image: 'category-earphones.png',
        title: ROUTES.Earphones.label,
    },
] as const