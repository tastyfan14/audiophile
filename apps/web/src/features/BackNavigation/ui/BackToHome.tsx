import { ROUTES } from '@/shared/config/constants'
import type { BackToHome } from '../model/types'
import Button from '@/shared/ui/Button'

export default function BackToHome({ variant, className }: BackToHome) {
    return (
        <Button
        as='link'
        href={ROUTES.home.route}
        variant={variant}
        className={className}
        >
            Back to home
        </Button>
    )
}