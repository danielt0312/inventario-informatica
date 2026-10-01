import type {
    ComboboxLayoutItem,
    ComboboxLayoutMultiple
} from "./combobox-layout.shared"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
    type ComboboxFieldSharedUIProps,
} from "./combobox-field.shared"
import {
    CreatableComboboxSimple,
    type CreatableComboboxSimpleProps
} from "./creatable-combobox-simple"

export type CreatableComboboxFieldSimpleProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = Omit<CreatableComboboxSimpleProps<Multiple, Item>, 'value' | 'onValueChange'>
    & ComboboxFieldSharedUIProps<Empty, Multiple, Item>

export function CreatableComboboxFieldSimple<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
>(props: CreatableComboboxFieldSimpleProps<Empty, Multiple, Item>) {
    const {
        items,
        layout,
        onFieldValueChange = defaultFieldValueFromItem(props.emptyValue),
        ...comboboxProps
    } = props

    const field = useFieldContext<ComboboxFieldType<Empty, Multiple, Item['value']>>()
    const derivedValue = useComboboxFieldValue(
        items,
        field.state.value,
        comboboxProps.multiple,
        props.emptyValue
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
