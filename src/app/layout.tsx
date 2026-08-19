import AppLayout from '@/shared/ui/layout/ui/AppLayout';
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

const ManropeFont = Manrope({
    variable: '--font-manrope',
    weight: ['400', '500', '700'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Frontend Mentor | Audiophile e-commerce website',
    description: '',
    icons: {
        icon: 'favicon-32x32.png'
    },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang='en' className={`${ManropeFont.variable}`}>
            <body>
                <AppLayout>
                    {children}
                </AppLayout>
            </body>
        </html>
    );
}
