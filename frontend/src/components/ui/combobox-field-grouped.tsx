import * as React from "react"
import { ComboboxLayoutGrouped } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroupedComponentProps } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroup, ComboboxLayoutItem, ComboboxLayoutItemValue, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    useComboboxFieldContext,
    type ComboboxFieldSharedUIProps,
} from "./combobox-field.shared"

export type ComboboxFieldGroupedProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
> = Omit<ComboboxLayoutGroupedComponentProps<Multiple, Item, Group>, "value" | "onValueChange">
    & ComboboxFieldSharedUIProps<Empty, Multiple, Item>

export function ComboboxFieldGrouped<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
>(props: ComboboxFieldGroupedProps<Empty, Multiple, Item, Group>) {
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

    const field = useComboboxFieldContext<Empty, Multiple, Item['value']>()
    const derivedValue = useComboboxFieldValue(
        flatItems,
        field.state.value,
        comboboxProps.multiple as never,
        props.emptyValue
    )

    return (
        <ComboboxLayoutGrouped<Multiple, Item, Group>
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
