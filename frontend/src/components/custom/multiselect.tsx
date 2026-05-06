import { PlusCircle } from 'lucide-react'
import { MultiSelect as MultiSelectPrimitive, type MultiSelectProps as MultiSelectPropsPrimitive } from '../composed/multiselect'
import { Badge } from '../ui/badge'

interface MuiltiSelectProps extends Omit<MultiSelectPropsPrimitive, 'triggerer'>{
    label?: string
    withCountIndicator?: boolean
}

export function MultiSelect ({
    label = 'Seleccionar',
    withCountIndicator = true,
    ...props
}: MuiltiSelectProps) {
    return (
        <MultiSelectPrimitive
            {...props}
            triggerer={(selected) => (
                <>
                    <PlusCircle/>{label}
                    {withCountIndicator && selected.length > 0 && (
                        <Badge className='h-4 min-w-4 px-1 tabular-nums'>{selected.length}</Badge>
                    )}
                </>
            )}
        />
    )
}
