import Button from '@/shared/ui/Button'
import type { AddToCart } from '../model/types'
import { useCartStore } from '@/entities/cart/model/store'

export default function AddToCart({ product, currentStock, currentQuantity, className }: AddToCart) {
    const addItem = useCartStore(state => state.addItem)

    return (
        <Button
            variant='primary'
            className={currentStock === 0 ? className : undefined}
            onClick={() =>
                addItem({
                    id: product.id,
                    slug: product.slug,
                    category: product.category,
                    image: product.image,
                    shortTitle: product.shortTitle,
                    price: product.price,
                    stock: product.stock,

                    quantity: currentQuantity,
                })
            }
            disabled={currentStock === 0 ? true : false}
        >
            Add to cart
        </Button>
    )
}