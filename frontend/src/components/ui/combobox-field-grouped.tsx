import * as React from "react"
import { ComboboxLayoutGrouped } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroupedComponentProps } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroup, ComboboxLayoutItem } from "./combobox-layout.shared"
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
} from "./combobox-field.shared"

type ComboboxFieldGroupedProps<
    TItem extends ComboboxLayoutItem,
    TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
    Multiple extends boolean | undefined = false,
    TEmpty extends ComboboxFieldEmptyType = undefined,
> = Omit<ComboboxLayoutGroupedComponentProps<TItem, TGroup, Multiple>, "value" | "onValueChange"> & {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">
    onFieldValueChange?: (
        value: Multiple extends true ? TItem[] : TItem | TEmpty
    ) => ComboboxFieldType<Multiple, TEmpty>
}

function createComboboxFieldGrouped<TEmpty extends ComboboxFieldEmptyType>(emptyValue: TEmpty) {
    return function ComboboxFieldGroupedImpl<
        TItem extends ComboboxLayoutItem,
        TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
        Multiple extends boolean | undefined = false,
    >(props: ComboboxFieldGroupedProps<TItem, TGroup, Multiple, TEmpty>) {
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

        const field = useFieldContext<ComboboxFieldType<Multiple, TEmpty>>()
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
                <ComboboxLayoutGrouped<TItem, TGroup, Multiple>
                    {...comboboxProps}
                    items={items}
                    // required={required}
                    disabled={disabled}
                    value={derivedValue as never}
                    onValueChange={(value) => field.handleChange(onFieldValueChange(value as never) as never)}
                />
            </FieldLayout>
        )
    }
}

export const ComboboxFieldGrouped = createComboboxFieldGrouped(undefined)
export const NullableComboboxFieldGrouped = createComboboxFieldGrouped(null)
