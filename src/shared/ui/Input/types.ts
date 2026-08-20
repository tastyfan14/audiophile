export type InputProps = {
    title: string

    rightEl?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    leftEl?: React.ComponentType<React.SVGProps<SVGSVGElement>>

    className?: string

    errorMessage: string | undefined
    errorId: string
} & React.ComponentPropsWithoutRef<'input'>