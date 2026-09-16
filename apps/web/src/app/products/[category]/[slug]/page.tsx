import { getProduct } from '@/entities/product/api/getProduct'
import MainLayout from '@/shared/ui/Layout/ui/MainLayout'
import PageWrapper from '@/shared/ui/Layout/ui/PageWrapper'
import CategoryNavigation from '@/widgets/CategoryNavigation/CategoryNavigation'
import Page from '@/widgets/Products/ui/Page/Page'
import Recommendation from '@/widgets/Products/ui/Recommendation/Recommendation'
import { notFound } from 'next/navigation'

interface CategoryAndSlugProps {
    params: Promise<{
        category: string
        slug: string
    }>
}

export default async function ProductPage({ params }: CategoryAndSlugProps) {
    const { category, slug } = await params

    const product = await getProduct(category, slug)

    if (!product) {
        notFound()
    }

    return (
        <PageWrapper>
            <MainLayout>
                <Page product={product} />

                <Recommendation recommendations={product.recommendations} />
            
                <CategoryNavigation variant='page' />
            </MainLayout>
        </PageWrapper>
    )
}