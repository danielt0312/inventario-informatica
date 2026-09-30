// combobox-field-creatable-grouped.tsx
import * as React from "react"
import { CreatableComboboxGrouped } from "./creatable-combobox-grouped"
import type { CreatableComboboxGroupedProps } from "./creatable-combobox-grouped"
import type { ComboboxLayoutGroup, ComboboxLayoutItem, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
} from "./combobox-field.shared"

type CreatableComboboxFieldGroupedProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
> = Omit<CreatableComboboxGroupedProps<Multiple, Item, Group>, "value" | "onValueChange"> & {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">
    onFieldValueChange?: (
        value: Multiple extends true ? Item[] : Item | Empty
    ) => ComboboxFieldType<Empty, Multiple>
}

function createCreatableComboboxFieldGrouped<Empty extends ComboboxFieldEmptyType>(
    emptyValue: Empty
) {
    return function CreatableComboboxFieldGroupedImpl<
        Multiple extends ComboboxLayoutMultiple,
        Item extends ComboboxLayoutItem,
        Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
    >(props: CreatableComboboxFieldGroupedProps<Empty, Multiple, Item, Group>) {
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

        const field = useFieldContext<ComboboxFieldType<Empty, Multiple>>()
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
                <CreatableComboboxGrouped<Multiple, Item, Group>
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

const CreatableComboboxFieldGrouped = createCreatableComboboxFieldGrouped(undefined)
const NullableCreatableComboboxFieldGrouped = createCreatableComboboxFieldGrouped(null)

export {
    CreatableComboboxFieldGrouped,
    NullableCreatableComboboxFieldGrouped,
    type CreatableComboboxFieldGroupedProps
}
