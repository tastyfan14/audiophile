import type { ProductFeature, ProductGallery, ProductInclude } from '@/entities/product/model/types'

type Basic = {
    className?: string
}

export type ProductFeatureProps = {
    features: ProductFeature[]
} & Basic

export type ProductIncludeProps = {
    includes: ProductInclude[]
} & Basic

export type ProductGalleryProps = {
    images: ProductGallery[]
} & Basic