import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import '@/shared/styles/main.scss'
import AppLayout from '@/shared/ui/Layout/ui/AppLayout'
import Footer from '@/widgets/Footer/Footer'
import Header from '@/widgets/Header/Header'

const ManropeFont = Manrope({
    variable: '--font-manrope',
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export const metadata: Metadata = {
    title: 'Audiophile',
    description: 'Audiophile e-commerce website created by tasty_fan14.',
    icons: {
        icon: 'favicon-32x32.png'
    },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang='en' className={`${ManropeFont.variable}`}>
            <body>
                <AppLayout>
                    <Header />

                    {children}

                    <Footer />
                </AppLayout>
            </body>
        </html>
    );
}
