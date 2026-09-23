'use client'

import clsx from 'clsx'
import cls from './Header.module.scss'
import IBurger from '@/shared/assets/icons/IBurger'
import ICart from '@/shared/assets/icons/ICart'
import ILogo from '@/shared/assets/icons/ILogo'
import Button from '@/shared/ui/Button'
import SiteNavigation from '@/shared/ui/SiteNavigation'
import CategoryNavigation from '@/widgets/CategoryNavigation/CategoryNavigation'
import Cart from '@/widgets/Cart/Cart'
import Burger from '@/shared/ui/Burger'
import Overlay from '@/shared/ui/Overlay'
import Container from '@/shared/ui/Layout/ui/Container'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCartStore } from '@/entities/cart/model/store'
import { useProductsStock } from '@/shared/lib/useProductsStock'

export default function Header() {
    const [isOpen, setIsOpen] = useState<'burger' | 'cart' | null>(null)

    const pathname = usePathname()

    const isCheckout = pathname.startsWith('/checkout')

    const items = useCartStore(state => state.items)

    const {
        data: currentStock,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useProductsStock(items.map(item => item.id))

    const handleCartOpen = async () => {
        setIsOpen(prev => prev === 'cart' ? null : 'cart')

        if (items.length > 0) {
            await refetch()
        }
    }

    return (
        <>
            <header className={cls.header}>
                <Container className={cls['header__container']}>
                    {/* Burger menu */}
                    <Button
                    variant='icon' 
                    className={clsx(cls['header__burger'], cls['header__overlay--burger'])} 
                    aria-label='Open menu'
                    aria-controls='burger'
                    aria-expanded={isOpen === 'burger'}
                    onClick={() => setIsOpen(prev => prev === 'burger' ? null : 'burger')}
                    >
                        <IBurger />
                    </Button>

                    <ILogo className={cls['header__logo']} />

                    <SiteNavigation className={clsx(cls['header__navigation'])} />

                    {/* Cart */}
                    <Button
                    variant='icon'
                    className={clsx(cls['header__cart'], cls['header__overlay--cart'], isCheckout && cls['header__cart--disabled'])}
                    aria-label={
                        items.length > 0
                        ? `Open cart, ${items.length} ${items.length === 1 ? 'item' : 'items'}`
                        : 'Open cart, empty'
                    }
                    aria-controls='cart'
                    aria-expanded={isOpen === 'cart'}
                    onClick={handleCartOpen}
                    disabled={isCheckout && true}
                    >
                        <ICart />

                        {items.length > 0 && !isCheckout && <span className={cls['header__cart--quantity']}>{items.length}</span>}
                    </Button>
                </Container>
            </header>

            <div className={cls['header__overlay']}>
                <Overlay
                isOpen={isOpen === 'burger' || isOpen === 'cart'}
                onClose={() => setIsOpen(null)}
                coverage='container'
                >
                    {isOpen === 'burger' && (
                        <Burger
                        isOpen={isOpen === 'burger'}
                        onClose={() => setIsOpen(null)}
                        >
                            <CategoryNavigation variant='menu' />
                        </Burger>
                    )}

                    {isOpen === 'cart' && !isCheckout && (
                        <Container>
                            <Cart
                            currentStock={currentStock}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            isError={isError}
                            isOpen={isOpen === 'cart'}
                            onClose={() => setIsOpen(null)}
                            />
                        </Container>
                    )}
                </Overlay>
            </div>
        </>
    )
}