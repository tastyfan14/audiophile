import { Router } from 'express'
import {
    getProductsByCategory,
    getProductsByCategoryAndSlug,
    getProductsStock
} from './products.controller.js'

const router = Router()

router.get('/api/products/:category', getProductsByCategory)

router.get('/api/products/:category/:slug', getProductsByCategoryAndSlug)

router.post('/api/products/stock', getProductsStock)

export default router