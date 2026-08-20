type ButtonVariants =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'icon'
    | 'additional'

type Basic = {
    variant: ButtonVariants

    children: React.ReactNode

    className?: string
}

export type ButtonProps =
    | {
        as?: 'button'

        leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
        rightIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>

        fullWidth?: boolean
        loading?: boolean
    } & Basic & React.ComponentPropsWithoutRef<'button'>
    | {
        as: 'link'

        href: string
    } & Basic & React.ComponentPropsWithoutRef<'a'>