import Footer from '@/widgets/Footer/Footer'
import Header from '@/widgets/Header/Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    )
}
