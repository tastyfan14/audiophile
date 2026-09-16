import { getProducts } from '@/entities/product/api/getProducts'
import { ROUTES } from '@/shared/config/constants'
import MainLayout from '@/shared/ui/Layout/ui/MainLayout'
import PageWrapper from '@/shared/ui/Layout/ui/PageWrapper'
import Banner from '@/widgets/Banner/Banner'
import CategoryNavigation from '@/widgets/CategoryNavigation/CategoryNavigation'
import HeroPage from '@/widgets/HeroPage/HeroPage'
import ProductList from '@/widgets/Products/ui/List/List'
import { notFound } from 'next/navigation'

interface CategoryProps {
    params: Promise<{
        category: string
    }>
}

export default async function CategoryPage({ params }: CategoryProps) {
    const { category } = await params

    const currentCategory = ROUTES[category as keyof typeof ROUTES]

    if (!currentCategory) {
        notFound()
    }

    const products = await getProducts(category)

    return (
        <PageWrapper>
            <HeroPage title={currentCategory.label} />

            <MainLayout>
                <ProductList products={products} />

                <CategoryNavigation variant='page' />

                <Banner />
            </MainLayout>
        </PageWrapper>
    )
}