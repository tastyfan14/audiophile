import { ROUTES } from '@/shared/config/constants'
import PageWrapper from '@/shared/ui/Layout/ui/PageWrapper'
import HeroPage from '@/widgets/HeroPage/HeroPage'
import { notFound } from 'next/navigation'

interface CategoryProps {
    params: Promise<{
        category: string
    }>
}

export default async function Category({ params }: CategoryProps) {
    const { category } = await params

    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

    const currentCategory = ROUTES[formattedCategory as keyof typeof ROUTES]

    if (!currentCategory) {
        notFound()
    }
    return (
        <PageWrapper>
            <HeroPage title={currentCategory.label} />
        </PageWrapper>
    )
}