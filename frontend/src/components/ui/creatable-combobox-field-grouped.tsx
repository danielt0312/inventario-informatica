import * as React from "react"
import { CreatableComboboxGrouped } from "./creatable-combobox-grouped"
import type { CreatableComboboxGroupedProps } from "./creatable-combobox-grouped"
import type { ComboboxLayoutGroup, ComboboxLayoutItem, ComboboxLayoutItemValue, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
    type ComboboxFieldSharedUIProps,
} from "./combobox-field.shared"

export type CreatableComboboxFieldGroupedProps<
    Value extends ComboboxLayoutItemValue,
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
> = Omit<CreatableComboboxGroupedProps<Multiple, Item, Group>, "value" | "onValueChange">
    & ComboboxFieldSharedUIProps<Value, Empty, Multiple, Item>

export function CreatableComboboxFieldGrouped<
    Value extends ComboboxLayoutItemValue,
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
>(props: CreatableComboboxFieldGroupedProps<Value, Empty, Multiple, Item, Group>) {
    const {
        items,
        layout,
        onFieldValueChange = defaultFieldValueFromItem(props.emptyValue),
        ...comboboxProps
    } = props

    const flatItems = React.useMemo(
        () => items.flatMap((group) => group.items),
        [items]
    )

    const field = useFieldContext<ComboboxFieldType<Value, Empty, Multiple>>()
    const derivedValue = useComboboxFieldValue(
        flatItems,
        field.state.value,
        comboboxProps.multiple as never,
        props.emptyValue
    )

    return (
        <CreatableComboboxGrouped<Multiple, Item, Group>
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
