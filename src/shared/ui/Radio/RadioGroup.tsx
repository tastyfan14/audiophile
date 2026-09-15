import type { RadioGroupProps } from './types'
import cls from './RadioGroup.module.scss'

export default function RadioGroup<T extends({ id: string })>({ name, value, onChange, options, renderCard }: RadioGroupProps<T>) {
    return (
        <div className={cls['radio-group']}>
            {options.map((option) => 
                renderCard({
                    option,
                    name,
                    checked: value === option.id,
                    onChange: () => onChange(option.id)
                })
            )}
        </div>
    )
}