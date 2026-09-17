import type { ProductDto, ProductStockDto } from '@audiophile/shared'
import type { Prisma } from '../../../generated/prisma/browser.js'

export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: {
        category: true,

        badges: {
            include: {
                badge: true,
            },
        },
        features: true,
        includes: true,
        gallery: true,
        recommendations: {
            include: {
                recommendation: true,
            },
        },
    }
}>

export function productDto(product: ProductWithRelations): ProductDto {
    return {
        id: product.id,
        slug: product.slug,
        category: product.category.id,

        badges: product.badges.map(({ badge }) => ({
            id: badge.id,
            label: badge.label,
        })),
        image: product.image,
        title: product.title,
        shortTitle: product.shortTitle,
        desc: product.desc,
        price: Number(product.price),
        stock: product.stock,
        features: product.features,
        includes: product.includes,
        gallery: product.gallery,
        recommendations: product.recommendations.map(({ recommendation }) => ({
            id: recommendation.id,
            slug: recommendation.slug,
            category: recommendation.categoryId,
            image: recommendation.image,
            title: recommendation.title,
        })),
    }
}

export function productStockDto(product: {
    id: string
    stock: number
}): ProductStockDto {
    return {
        id: product.id,
        stock: product.stock,
    }
}