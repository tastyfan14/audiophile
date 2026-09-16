import Footer from '@/widgets/Footer/Footer'
import Header from '@/widgets/Header/Header'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    )
}