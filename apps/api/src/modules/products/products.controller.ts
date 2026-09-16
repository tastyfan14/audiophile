import type { NextFunction, Request, Response } from 'express'
import { productsService } from './products.service.js'

export async function getProductsByCategory(req: Request<{ category: string }>, res: Response) {
    const { category } = req.params

    if (!category) {
        return res.status(404).json({ message: 'Category not found' })
    }

    const products = await productsService.getProductsByCategory(category)

    return res.json(products)
}

export async function getProductsByCategoryAndSlug(req: Request<{ category: string, slug: string }>, res: Response) {
    const { category, slug } = req.params

    if (!category) {
        return res.status(404).json({ message: 'Category not found' })
    }

    if (!slug) {
        return res.status(404).json({ message: 'Slug not found' })
    }

    const product = await productsService.getProductsByCategoryAndSlug(category, slug)

    if (!product) {
        return res.status(404).json({ message: 'Product not found' })
    }

    return res.json(product)
}

export async function getProductsStock(req: Request, res: Response, next: NextFunction) {
    try {
        const { productIds } = req.body

        const products = await productsService.getProductsStock(productIds)

        res.status(200).json(products)
    } catch(error) {
        next(error)
    }
}