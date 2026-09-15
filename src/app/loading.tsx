import PageWrapper from '@/shared/ui/Layout/ui/PageWrapper'
import cls from './loading.module.scss'
import MainLayout from '@/shared/ui/Layout/ui/MainLayout'
import AppLayout from '@/shared/ui/Layout/ui/AppLayout'

export default function Loading() {
    return (
        <AppLayout>
            <PageWrapper>
                <MainLayout className={cls.loading}>
                    <div className={cls['loading-row']}>
                        <div className={cls['loading-row__block']} />
                        <div className={cls['loading-row__block']} />
                        <div className={cls['loading-row__block']} />
                    </div>

                    <div className={cls['loading-column']}>
                        <div className={cls['loading-column__block']} />
                        <div className={cls['loading-column__block']} />
                        <div className={cls['loading-column__block']} />
                    </div>

                    <div className={cls['loading-double']}>
                        <div className={cls['loading-double__block']} />
                        <div className={cls['loading-double__block']} />
                    </div>
                </MainLayout>
            </PageWrapper>
        </AppLayout>
    )
}