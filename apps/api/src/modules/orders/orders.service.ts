import { prisma } from '../../shared/prisma.js'
import type { CreateOrderDto } from './orders.dto.js'

const SHIPPING = 50
const VAT_RATE = 0.2

export async function createOrder(data: CreateOrderDto) {
    const { items } = data

    const productIds = items.map((item) => item.productId)

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    })

    if (products.length !== productIds.length) {
        throw new Error('One or more products were not found')
    }

    const orderItems = items.map((item) => {
        const product = products.find((product) => product.id === item.productId)

        if (!product) {
            throw new Error(`Product ${item.productId} not found`)
        }

        if (product.stock < item.quantity) {
            throw new Error(`Not enough stock for product "${product.title}"`)
        }

        return {
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
        }
    })

    const total = orderItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

    const shipping = SHIPPING
    const vat = total * VAT_RATE
    const grandTotal = total + shipping + vat

    const order = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                zip: data.zip,
                country: data.country,
                paymentMethod: data.paymentMethod,

                total,
                shipping,
                vat,
                grandTotal,

                items: {
                    create: orderItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },

            include: {
                items: true,
            },
        })

        for (const item of items) {
            const updatedProduct = await tx.product.updateMany({
                where: {
                    id: item.productId,
                    stock: {
                        gte: item.quantity,
                    },
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            })

            if (updatedProduct.count !== 1) {
                throw new Error(`Not enough stock for product ${item.productId}`)
            }
        }

        return createdOrder
    })

    return {
        id: order.id,
        status: order.status,
        total: Number(order.total),
        shipping: Number(order.shipping),
        vat: Number(order.vat),
        grandTotal: Number(order.grandTotal),

        items: order.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            price: Number(item.price),
        })),
    }
}
