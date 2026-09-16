import type { RadioGroupProps } from './types'
import cls from './RadioGroup.module.scss'
import clsx from 'clsx'

export default function RadioGroup<T extends({ id: string })>({ title, name, value, onChange, options, renderCard, errorId, errorMessage, className }: RadioGroupProps<T>) {
    const error = errorMessage && errorMessage !== 'none'
    
    return (
        <fieldset className={clsx(cls['radio-group'], className)}>
            <div className={cls['radio-group-overview']}>
                <legend className={clsx(cls['radio-group-overview__title'], error && cls['radio-group-overview__title--error'])}>{title}</legend>

                {error && (
                    <span id={`error-${errorId}`} className={cls['radio-group-overview__error']}>{errorMessage}</span>
                )}
            </div>

            <div className={cls['radio-group__options']}>
                {options.map((option) => 
                    renderCard({
                        option,
                        name,
                        checked: value === option.id,
                        onChange: () => onChange(option.id)
                    })
                )}
            </div>
        </fieldset>
    )
}