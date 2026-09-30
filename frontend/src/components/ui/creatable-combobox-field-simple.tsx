import type { ComboboxLayoutItem, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
} from "./combobox-field.shared"
import { CreatableComboboxSimple, type CreatableComboboxSimpleProps } from "./creatable-combobox-simple"

type CreatableComboboxLayoutFieldSimpleProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = Omit<CreatableComboboxSimpleProps<Multiple, Item>, 'value' | 'onValueChange'> & {
    onFieldValueChange?: (
        value: Multiple extends true ? Item[] : Item | Empty
    ) => ComboboxFieldType<Multiple, Empty>
}

function createCreatableComboboxFieldSimple<Empty extends ComboboxFieldEmptyType>(emptyValue: Empty) {
    return function CreatableComboboxFieldSimpleImpl<
        Item extends ComboboxLayoutItem,
        Multiple extends ComboboxLayoutMultiple,
    >(props: CreatableComboboxLayoutFieldSimpleProps<Empty, Multiple, Item>) {
        const {
            items,
            layout,
            onFieldValueChange = defaultFieldValueFromItem(emptyValue),
            ...comboboxProps
        } = props

        const field = useFieldContext<ComboboxFieldType<Multiple, Empty>>()
        const derivedValue = useComboboxFieldValue(
            items,
            field.state.value,
            comboboxProps.multiple as never,
            emptyValue
        )

        return (
            <CreatableComboboxSimple<Multiple, Item>
                {...comboboxProps}
                layout={{
                    errors: field.state.meta.errors,
                    ...layout
                }}
                items={items}
                value={derivedValue as never}
                onValueChange={(value) => field.handleChange(onFieldValueChange(value as never) as never)}
            />
        );
    }
}

const CreatableComboboxFieldSimple = createCreatableComboboxFieldSimple(undefined)
const NullableCreatableComboboxFieldSimple = createCreatableComboboxFieldSimple(null)

export {
    CreatableComboboxFieldSimple,
    NullableCreatableComboboxFieldSimple,
    type CreatableComboboxLayoutFieldSimpleProps
}
