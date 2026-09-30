import * as React from "react"
import { ComboboxLayoutGrouped } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroupedComponentProps } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroup, ComboboxLayoutItem, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
} from "./combobox-field.shared"

export type ComboboxFieldGroupedProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
> = Omit<ComboboxLayoutGroupedComponentProps<Multiple, Item, Group>, "value" | "onValueChange"> & {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">
    onFieldValueChange?: (
        value: Multiple extends true ? Item[] : Item | Empty
    ) => ComboboxFieldType<Multiple, Empty>
}

function createComboboxFieldGrouped<Empty extends ComboboxFieldEmptyType>(emptyValue: Empty) {
    return function ComboboxFieldGroupedImpl<
        Multiple extends ComboboxLayoutMultiple,
        Item extends ComboboxLayoutItem,
        Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
    >(props: ComboboxFieldGroupedProps<Empty, Multiple, Item, Group>) {
        const {
            items,
            layout,
            className,
            required,
            disabled,
            onFieldValueChange = defaultFieldValueFromItem(emptyValue),
            ...comboboxProps
        } = props

        const flatItems = React.useMemo(
            () => items.flatMap((group) => group.items),
            [items]
        )

        const field = useFieldContext<ComboboxFieldType<Multiple, Empty>>()
        const derivedValue = useComboboxFieldValue(
            flatItems,
            field.state.value,
            comboboxProps.multiple as never,
            emptyValue
        )

        return (
            <FieldLayout
                className={className}
                fieldLayout={{
                    required,
                    disabled,
                    errors: field.state.meta.errors,
                    ...layout
                }}
            >
                <ComboboxLayoutGrouped<Multiple, Item, Group>
                    {...comboboxProps}
                    items={items}
                    // required={required}
                    disabled={disabled}
                    value={(derivedValue ?? null) as never}
                    onValueChange={(value) => field.handleChange(onFieldValueChange(value as never) as never)}
                />
            </FieldLayout>
        )
    }
}

export const ComboboxFieldGrouped = createComboboxFieldGrouped(undefined)
export const NullableComboboxFieldGrouped = createComboboxFieldGrouped(null)
