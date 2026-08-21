import Input from '../Input'
import Label from '../Label'
import type { RadioCardProps } from './types'
import cls from './RadioCard.module.scss'
import clsInput from '../Input/Input.module.scss'
import clsx from 'clsx'

export default function RadioCard({ errorId, errorMessage, checked, onChange, children, ...props }: RadioCardProps) {
    return (
        <Label className={clsx(cls['radio-card'], clsInput.radio)} errorMessage={errorMessage} errorId={errorId}>
            <Input type='radio' errorId={errorId} checked={checked} onChange={onChange} {...props} />

            <span className={cls['radio-card__circle']} />

            {children}
        </Label>
    )
}