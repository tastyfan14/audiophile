import type { IconProps } from '../types'

export default function IButtonRightArrow({ ...props }: IconProps) {
    return (
        <svg {...props} width="8" height="12" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.322 1l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
    )
}