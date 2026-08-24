// combobox-field-creatable-grouped.tsx
import * as React from "react"
import { CreatableComboboxGrouped } from "./creatable-combobox-grouped"
import type { CreatableComboboxGroupedProps } from "./creatable-combobox-grouped"
import type { ComboboxLayoutGroup, ComboboxLayoutItem } from "./combobox-layout.shared"
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmpty,
    type ComboboxFieldPrimitive,
} from "./combobox-field.shared"

type CreatableComboboxFieldGroupedProps<
    TItem extends ComboboxLayoutItem,
    TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
    Multiple extends boolean | undefined = false,
    TEmpty extends ComboboxFieldEmpty = undefined,
> = Omit<CreatableComboboxGroupedProps<TItem, TGroup, Multiple>, "value" | "onValueChange"> & {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">
    onFieldValueChange?: (
        value: Multiple extends true ? TItem[] : TItem | TEmpty
    ) => ComboboxFieldPrimitive<Multiple, TEmpty>
}

function createCreatableComboboxFieldGrouped<TEmpty extends ComboboxFieldEmpty>(
    emptyValue: TEmpty
) {
    return function CreatableComboboxFieldGroupedImpl<
        TItem extends ComboboxLayoutItem,
        TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
        Multiple extends boolean | undefined = false,
    >(props: CreatableComboboxFieldGroupedProps<TItem, TGroup, Multiple, TEmpty>) {
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

        const field = useFieldContext<ComboboxFieldPrimitive<Multiple, TEmpty>>()
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
                <CreatableComboboxGrouped<TItem, TGroup, Multiple>
                    {...comboboxProps}
                    items={items}
                    required={required}
                    disabled={disabled}
                    value={derivedValue as never}
                    onValueChange={(value) => field.handleChange(onFieldValueChange(value as never) as never)}
                />
            </FieldLayout>
        )
    }
}

export const CreatableComboboxFieldGrouped = createCreatableComboboxFieldGrouped(undefined)
export const NullableCreatableComboboxFieldGrouped = createCreatableComboboxFieldGrouped(null)
