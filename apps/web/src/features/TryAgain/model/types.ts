export type TryAgain = {
    variant: 'primary' | 'secondary'
    className?: string
    onRetry: () => void
}