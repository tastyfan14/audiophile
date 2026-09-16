import type { Request, Response } from 'express'
import { createOrderSchema } from './orders.schema.js'
import { createOrder } from './orders.service.js'

export async function createOrderController(req: Request, res: Response) {
    const result = createOrderSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: 'Invalid order data',
        })
    }

    try {
        const order = await createOrder(result.data)

        return res.status(201).json(order)
    } catch (e) {
        console.error(e)

        if (!(e instanceof Error)) {
            return res.status(500).json({
                message: 'Failed to create order',
            })
        }

        if (e.message.includes('not found')) {
            return res.status(404).json({
                message: e.message,
            })
        }

        if (e.message.includes('Not enough stock')) {
            return res.status(409).json({
                message: e.message,
            })
        }

        return res.status(500).json({
            message: 'Failed to create order',
        })
    }
}