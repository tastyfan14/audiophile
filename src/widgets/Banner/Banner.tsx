import cls from './Banner.module.scss'
import ResponsiveImage from '@/shared/ui/ResponsiveImage'

export default function Banner() {
    return (
        <section className={cls.banner}>
            <ResponsiveImage
            mobile='/images/mobile/banner/image-best-gear.jpg'
            laptop='/images/laptop/banner/image-best-gear.jpg'
            desktop='/images/desktop/banner/image-best-gear.jpg'
            alt=''
            className={cls['banner__picture']}
            aria-hidden='true'
            />

            <div className={cls['banner__overview']}>
                <h2 className={cls['banner__title']}>Bringing you the <span className={cls['banner__title--highlight']}>best</span> audio gear</h2>
                <p className={cls['banner__desc']}>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
            </div>
        </section>
    )
}