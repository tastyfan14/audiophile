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
        route: '/',
        label: 'HOME',
    },
    Product: {
        route: PRODUCTS,
        label: 'PRODUCT',
    },
    Headphones: {
        route: `${PRODUCTS}/headphones`,
        label: 'HEADPHONES',
    },
    Speakers: {
        route: `${PRODUCTS}/speakers`,
        label: 'SPEAKERS',
    },
    Earphones: {
        route: `${PRODUCTS}/earphones`,
        label: 'EARPHONES',
    },
    Checkout: {
        route: '/checkout',
        label: 'CHECKOUT',
    },
} as const