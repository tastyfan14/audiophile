export type OverlayProps = {
    isOpen: boolean
    onClose: () => void
    className?: string
    coverage: 'viewport' | 'container'
    children: React.ReactNode
}