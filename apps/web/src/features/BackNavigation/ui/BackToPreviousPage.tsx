import Button from '@/shared/ui/Button'
import { useRouter } from 'next/navigation'
import type { BackToPreviousPage } from '../model/types'

export default function BackToPreviousPage({ className }: BackToPreviousPage) {
    const router = useRouter()

    return (
        <Button
        variant='additional'
        className={className}
        onClick={() => router.back()}
        >
            Go back
        </Button>
    )
}