import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import '@/shared/styles/main.scss'
import AppLayout from '@/shared/ui/Layout/ui/AppLayout'
import QueryProvider from '@/shared/providers/QueryProvider'
import { SITE_URL } from '@/shared/config/constants'

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
    metadataBase: new URL(SITE_URL),

    title: 'Audiophile',
    description: 'Audiophile e-commerce website created by tasty_fan14.',

    alternates: {
        canonical: '/',
    },

    openGraph: {
        title: 'Audiophile',
        description: 'Audiophile e-commerce website created by tasty_fan14.',
        url: SITE_URL,
        siteName: 'Audiophile',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/preview.webp',
                width: 800,
                height: 600,
                alt: 'Audiophile e-commerce website created by tasty_fan14.',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Audiophile',
        description: 'Audiophile e-commerce website created by tasty_fan14.',
        images: ['/preview.webp'],
    },

    robots: {
        index: true,
        follow: true,
    },

    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang='en' className={`${ManropeFont.variable}`}>
            <body>
                <QueryProvider>
                    <AppLayout>
                        {children}
                    </AppLayout>
                </QueryProvider>
            </body>
        </html>
    )
}
