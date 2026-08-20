import Image from 'next/image'
import { ResponsiveImageProps } from './types'

export default function ResponsiveImage({ mobile, laptop, desktop, alt, className, ...props }: ResponsiveImageProps) {
    return (
        <div className={className}>
            <picture>
                <source
                media='(min-width: 1440px)'
                srcSet={desktop}
                />

                <source
                media='(min-width: 768px) and (max-width: 1439px)'
                srcSet={laptop}
                />

                <Image
                src={mobile}
                alt={alt}
                fill
                sizes='100%'
                style={{ objectFit: 'cover' }}
                {...props}
                />
            </picture>
        </div>
    )
}