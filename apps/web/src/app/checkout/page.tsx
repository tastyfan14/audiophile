import Checkout from '@/widgets/Checkout/Checkout'
import MainLayout from '@/shared/ui/Layout/ui/MainLayout'
import PageTheme from './pageTheme'
import PageWrapper from '@/shared/ui/Layout/ui/PageWrapper'

export default function CheckoutPage() {
    return (
        <PageWrapper>
            <PageTheme />

            <MainLayout>
                <Checkout />
            </MainLayout>
        </PageWrapper>
    )
}