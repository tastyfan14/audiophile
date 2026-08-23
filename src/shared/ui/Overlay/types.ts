export type OverlayProps = {
    isOpen: boolean
    onClose: () => void
    className?: string
    children: React.ReactNode
}