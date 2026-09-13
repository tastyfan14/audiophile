import { PRODUCT_SHOWCASE } from '@/entities/product/model/config'
import ShowcaseAccent from './ShowcaseAccent'
import cls from './Showcase.module.scss'
import ShowcaseDefault from './ShowcaseDefault'
import ShowcaseDouble from './ShowcaseDouble'

export default function Showcase() {
    return (
        <section className={cls['showcase']} aria-label='Product showcase'>
            {PRODUCT_SHOWCASE.map((item) => {
                switch (item.variant) {
                    case 'accent':
                        return (
                            <ShowcaseAccent key={item.id} item={item} />
                        )

                    case 'default':
                        return (
                            <ShowcaseDefault key={item.id} item={item} />
                        )

                    case 'double':
                        return (
                            <ShowcaseDouble key={item.id} item={item} />
                        )

                    default:
                        return null
                }
            })}
        </section>
    )
}