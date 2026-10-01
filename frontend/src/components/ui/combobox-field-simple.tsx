import { ComboboxLayoutSimple } from "./combobox-layout-simple"
import type { ComboboxLayoutSimpleComponentProps } from "./combobox-layout-simple"
import type { ComboboxLayoutItem, ComboboxLayoutItemValue, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    useComboboxFieldContext,
    type ComboboxFieldSharedUIProps,
} from "./combobox-field.shared"

export type ComboboxFieldSimpleProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = Omit<ComboboxLayoutSimpleComponentProps<Multiple, Item>, "value" | "onValueChange">
    & ComboboxFieldSharedUIProps<Empty, Multiple, Item>

export function ComboboxFieldSimple<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
>(props: ComboboxFieldSimpleProps<Empty, Multiple, Item>) {
    const {
        items,
        layout,
        onFieldValueChange = defaultFieldValueFromItem(props.emptyValue),
        ...comboboxProps
    } = props

    const field = useComboboxFieldContext<Empty, Multiple, Item['value']>()
    const derivedValue = useComboboxFieldValue(
        items,
        field.state.value,
        comboboxProps.multiple,
        props.emptyValue
    )

    return (
        <ComboboxLayoutSimple<Multiple, Item>
            {...comboboxProps}
            items={items}
            value={derivedValue as never}
            onValueChange={(value) => field.handleChange(onFieldValueChange(value as never) as never)}
            layout={{
                errors: field.state.meta.errors,
                ...layout
            }}
        />
    )
}
