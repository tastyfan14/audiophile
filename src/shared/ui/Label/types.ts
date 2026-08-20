export type LabelProps = {
    title: string
    variant: 'in' | 'out'
    className?: string

    children: React.ReactNode

    errorMessage: string | undefined
    errorId: string
} & React.ComponentPropsWithoutRef<'label'>