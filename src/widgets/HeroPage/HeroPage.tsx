import cls from './HeroPage.module.scss'

export default function HeroPage({ title }: { title: string }) {
    return (
        <section className={cls['heropage']}>
            <h1 className={cls['heropage__title']}>{title}</h1>
        </section>
    )
}