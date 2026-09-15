export type CounterProps = {
    value: number
    onChange: (value: number) => void
    variant: 'cart' | 'page'
    className?:  string
}