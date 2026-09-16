type RadioGroupRenderProps<T> = {
    option:  T
    name?: string
    checked: boolean
    onChange: () => void
}

export type RadioGroupProps<T extends { id: string }> = {
    title: string
    name?: string
    value?: string
    onChange: (value: string) => void
    options: T[]
    renderCard: (props: RadioGroupRenderProps<T>) => React.ReactNode
    errorId: string
    errorMessage: string | undefined
    className?: string
}

export type RadioCardProps = {
    errorId: string
    errorMessage: string | undefined
    checked: boolean
    onChange: () => void
    children: React.ReactNode
} & React.ComponentPropsWithoutRef<'input'>