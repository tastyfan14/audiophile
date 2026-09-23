import data from './data/products.json' with { type: 'json' }
import { prisma } from '../src/shared/prisma.js'

async function main() {
    for (const category of data.categories) {
        await prisma.productCategory.create({
            data: {
                id: category.id,
            },
        })
    }

    for (const badge of data.badges) {
        await prisma.productBadge.create({
            data: {
                id: badge.id,
                label: badge.label,
            },
        })
    }

    for (const productData of data.products) {
        const product = await prisma.product.create({
            data: {
                slug: productData.slug,
                categoryId: productData.categoryId,
                image: productData.image,
                title: productData.title,
                shortTitle: productData.shortTitle,
                desc: productData.desc,
                price: productData.price,
                stock: productData.stock,
            },
        })

        if (productData.badges.length > 0) {
            await prisma.productBadgeOnProduct.createMany({
                data: productData.badges.map((badge) => ({
                    productId: product.id,
                    badgeId: badge,
                })),
            })
        }
    }

    for (const [slug, features] of Object.entries(data.features)) {
        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
        })

        if (!product) {
            throw new Error(`'Product not found: ${slug}'`)
        }

        await prisma.productFeature.createMany({
            data: features.map((description) => ({
                desc: description,
                productId: product.id,
            })),
        })
    }

    for (const [slug, includes] of Object.entries(data.includes)) {
        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
        })

        if (!product) {
            throw new Error(`'Product not found:' ${slug}`)
        }

        await prisma.productInclude.createMany({
            data: includes.map((item) => ({
                quantity: item.quantity,
                title: item.title,
                productId: product.id,
            })),
        })
    }

    for (const [slug, gallery] of Object.entries(data.gallery)) {
        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
        })

        if (!product) {
            throw new Error(`'Product not found:' ${slug}`)
        }

        await prisma.productGallery.createMany({
            data: gallery.map((image) => ({
                mobile: image.mobile,
                laptop: image.laptop,
                desktop: image.desktop,
                alt: image.alt,
                productId: product.id,
            })),
        })
    }

    for (const [slug, recommendations] of Object.entries(data.recommendations)) {
        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
        })

        if (!product) {
            throw new Error(`'Product not found:' ${slug}`)
        }

        const recommendationsProducts = await prisma.product.findMany({
            where: {
                slug: {
                    in: recommendations,
                },
            },
            select: {
                id: true,
                slug: true,
            },
        })

        await prisma.productRecommendation.createMany({
            data: recommendationsProducts.map((recommendation) => ({
                productId: product.id,
                recommendationId: recommendation.id,
            })),
        })
    }
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })