import type {
    Product,
    ProductFeature,
    ProductGallery,
    ProductInclude,
    ProductRecommendation,
} from '@/entities/product/model/types'

export type ProductFeatureProps = {
    features: ProductFeature[]
}

export type ProductIncludeProps = {
    includes: ProductInclude[]
}

export type ProductGalleryProps = {
    images: ProductGallery[]
}

export type ProductRecommendationProps = {
    recommendations: ProductRecommendation[]
}

export type ProductPageProps = {
    product: Product
}

export type ProductListProps = {
    category: string
}