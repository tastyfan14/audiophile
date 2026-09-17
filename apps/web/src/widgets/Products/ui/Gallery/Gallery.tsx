import ResponsiveImage from '@/shared/ui/ResponsiveImage'
import cls from './Gallery.module.scss'
import type { ProductGalleryProps } from '../../model/types'

export default function Gallery({ images }: ProductGalleryProps) {
    return (
        <div className={cls.gallery}>
            {images.map((image) => {
                return (
                    <ResponsiveImage
                    key={image.id}
                    mobile={`/images/mobile/products/gallery-${image.mobile}`}
                    laptop={`/images/laptop/products/gallery-${image.laptop}`}
                    desktop={`/images/desktop/products/gallery-${image.desktop}`}
                    alt=''
                    className={cls['gallery__picture']}
                    loading='lazy'
                    />
                )
            })}
        </div>
    )
}