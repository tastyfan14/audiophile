import { prisma } from '../../shared/prisma.js'

const ProductInclude = {
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

export const productsRepository = {
    getProductsByCategory(category: string) {
        return prisma.product.findMany({
            where: {
                categoryId: category,
            },
            include: ProductInclude,
            orderBy: {
                createdAt: 'asc',
            },
        })
    },


    getProductsByCategoryAndSlug(category: string, slug: string) {
        return prisma.product.findFirst({
            where: {
                categoryId: category,
                slug,
            },
            include:ProductInclude,
        })
    },

    getProductsStock(productIds: string[]) {
        return prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
            select: {
                id: true,
                stock: true,
            },
        })
    }
}