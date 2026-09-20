import Button from '@/shared/ui/Button'
import type { TryAgain } from '../model/types'

export default function TryAgain({ variant, className, onRetry }: TryAgain) {
    return (
        <Button
        variant={variant}
        className={className}
        onClick={onRetry}
        >
            Try again
        </Button>
    )
}