// import type { ProductDto } from '@audiophile/shared'
import type { ProductDto } from './types'
import type { Product } from '../model/types'

export default function ProductDto(data: ProductDto): Product {
    return {
        id: data.id,
        slug: data.slug,
        category: data.category,

        badges: data.badges.map((badge) => ({
            id: badge.id,
            label: badge.label,
        })),

        image: data.image,
        title: data.title,
        shortTitle: data.shortTitle,
        desc: data.desc,
        price: data.price,

        features: data.features.map((feature) => ({
            id: feature.id,
            desc: feature.desc,
        })),

        includes: data.includes.map((include) => ({
            id: include.id,
            quantity: include.quantity,
            title: include.title,
        })),

        gallery: data.gallery.map((image) => ({
            id: image.id,
            mobile: image.mobile,
            laptop: image.laptop,
            desktop: image.desktop,
            alt: image.alt,
        })),

        recommendations: data.recommendations.map((recommendation) => ({
            id: recommendation.id,
            slug: recommendation.slug,
            category: recommendation.category,
            image: recommendation.image,
            title: recommendation.title,
        })),

        stock: data.stock,
    }
}