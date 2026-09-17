type Basic = {
    className?: string
}

export type BackToHome = {
    variant: 'primary' | 'secondary'
} & Basic

export type BackToPreviousPage = Basic