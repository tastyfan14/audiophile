export type InputProps = {
    rightEl?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    leftEl?: React.ComponentType<React.SVGProps<SVGSVGElement>>

    className?: string

    errorId: string
} & React.ComponentPropsWithoutRef<'input'>