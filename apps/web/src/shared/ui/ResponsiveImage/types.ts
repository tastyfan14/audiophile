import { ImageProps } from 'next/image'

export type ResponsiveImageProps = {
    mobile: string
    laptop?: string
    desktop?: string
    alt: string
    className?: string
} & Omit<ImageProps, 'src'>