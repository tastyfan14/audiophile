import Button from '@/shared/ui/Button'
import type { RemoveFromCart } from '../model/types'
import { useCartStore } from '@/entities/cart/model/store'

export default function RemoveFromCart({ className }: RemoveFromCart) {
    const clearCart = useCartStore(state => state.clearCart)

    return (
        <Button
        variant='additional'
        className={className}
        onClick={clearCart}>
            Remove all
        </Button>
    )
}