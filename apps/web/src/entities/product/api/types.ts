export interface GetProductsByCategoryParams {
    category: string
}

export interface GetProductsByCategoryAndSlugParams {
    category: string
    slug: string
}

export interface ProductDto {
    id: string
    slug: string
    category: string

    badges: {
        id: string
        label: string
    }[]

    image: string
    title: string
    shortTitle: string
    desc: string
    price: number

    features: {
        id: string
        desc: string
    }[]

    includes: {
        id: string
        quantity: number
        title: string
    }[]

    gallery: {
        id: string
        mobile: string
        laptop: string
        desktop: string
        alt: string
    }[]

    recommendations: {
        id: string
        slug: string
        category: string
        image: string
        title: string
    }[]

    stock: number
}

export interface ProductStockDto {
    id: string
    stock: number
}