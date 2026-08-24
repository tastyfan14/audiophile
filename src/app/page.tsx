import PageWrapper from '@/shared/ui/Layout/ui/PageWrapper'
import MainLayout from '@/shared/ui/Layout/ui/MainLayout'
import Hero from '@/widgets/Hero/Hero'
import Banner from '@/widgets/Banner/Banner'
import CategoryNavigation from '@/widgets/CategoryNavigation/CategoryNavigation'

export default function Home() {
    return (
        <PageWrapper>
            <Hero />

            <MainLayout>
                <CategoryNavigation variant='page' />

                <Banner />
            </MainLayout>
        </PageWrapper>
    )
}