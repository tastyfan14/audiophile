export type LabelProps = {
    title?: string
    className?: string

    children: React.ReactNode

    errorMessage: string | undefined
    errorId: string
} & React.ComponentPropsWithoutRef<'label'>