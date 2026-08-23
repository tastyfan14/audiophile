export type BurgerProps = {
    isOpen: boolean
    onClose: () => void
    className?: string
    children: React.ReactNode
}