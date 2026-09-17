import type { ProductStockDto } from '@audiophile/shared'
import { productDto, productStockDto } from './products.mapper.js'
import { productsRepository } from './products.repository.js'

export const productsService = {
    async getProductsByCategory(category: string) {
        const products = await productsRepository.getProductsByCategory(category)

        return products.map(productDto)
    },

    async getProductsByCategoryAndSlug(category: string, slug: string) {
        const product = await productsRepository.getProductsByCategoryAndSlug(category, slug)

        if (!product) {
            return null
        }

        return productDto(product)
    },

    async getProductsStock(productIds: string[]): Promise<ProductStockDto[]> {
        const products = await productsRepository.getProductsStock(productIds)

        return products.map(productStockDto)
    },
}