export interface Product {
    id: string
    slug: string
    category: string[] //
    badges: string[] //
    image: string
    title: string
    desc: string
    price: number
    features: string[] //
    includes: string[] //
    gallery: string[] //
    recommendations: string[] //
    stock: number
}