import { PRODUCT_SHOWCASE_VARIANTS } from './config'

export type ProductBadge = {
    id: string
    label: string
}

export type ProductFeature = {
    id: string
    desc: string
}

export type ProductInclude = {
    id: string
    quantity: number
    title: string
}

export type ProductGallery = {
    id: string
    mobile: string
    laptop: string
    desktop: string
    alt: string
}

export type ProductRecommendation = {
    id: string
    slug: string
    category: string
    image: string
    title: string
}

export interface Product {
    id: string

    slug: string
    category: string

    badges: ProductBadge[]

    image: string
    title: string
    desc: string
    price: number

    features: ProductFeature[]
    includes: ProductInclude[]
    gallery: ProductGallery[]
    recommendations: ProductRecommendation[]

    stock: number
}

// Home showcase

export type ProductShowcaseVariants = (typeof PRODUCT_SHOWCASE_VARIANTS)[keyof typeof PRODUCT_SHOWCASE_VARIANTS]

type ProductShowcaseBase = {
    id: string
    slug: string
    category: string
    title: string
    image: string
}

export type ProductShowcase =
    | (ProductShowcaseBase & {
        variant: typeof PRODUCT_SHOWCASE_VARIANTS.accent
        desc: string
    })
    | (ProductShowcaseBase & {
        variant: typeof PRODUCT_SHOWCASE_VARIANTS.default
    })
    | (ProductShowcaseBase & {
        variant: typeof PRODUCT_SHOWCASE_VARIANTS.double
    })