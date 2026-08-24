import { ROUTES } from '@/shared/config/constants'
import MainLayout from '@/shared/ui/Layout/ui/MainLayout'
import PageWrapper from '@/shared/ui/Layout/ui/PageWrapper'
import Banner from '@/widgets/Banner/Banner'
import CategoryNavigation from '@/widgets/CategoryNavigation/CategoryNavigation'
import HeroPage from '@/widgets/HeroPage/HeroPage'

export default function Products() {
    return (
        <PageWrapper>
            <HeroPage title={ROUTES.Products.label} />

            <MainLayout>
                <CategoryNavigation variant='page' />

                <Banner />
            </MainLayout>
        </PageWrapper>
    )
}