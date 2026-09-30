import { ComboboxLayoutSimple } from "./combobox-layout-simple"
import type { ComboboxLayoutSimpleComponentProps } from "./combobox-layout-simple"
import type { ComboboxLayoutItem, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
    useComboboxFieldContext,
} from "./combobox-field.shared"

export type ComboboxFieldSimpleProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = Omit<ComboboxLayoutSimpleComponentProps<Multiple, Item>, "value" | "onValueChange"> & {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">
    onFieldValueChange?: (
        value: Multiple extends true ? Item[] : Item | Empty
    ) => ComboboxFieldType<Multiple, Empty>
}

function createComboboxFieldSimple<Empty extends ComboboxFieldEmptyType>(emptyValue: Empty) {
    return function ComboboxFieldSimpleImpl<
        Multiple extends ComboboxLayoutMultiple,
        Item extends ComboboxLayoutItem,
    >(props: ComboboxFieldSimpleProps<Empty, Multiple, Item>) {
        const {
            items,
            layout,
            className,
            required,
            disabled,
            onFieldValueChange = defaultFieldValueFromItem(emptyValue),
            ...comboboxProps
        } = props

        const field = useComboboxFieldContext<Multiple, Empty>()
        const derivedValue = useComboboxFieldValue(
            items,
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
                <ComboboxLayoutSimple<Multiple, Item>
                    {...comboboxProps}
                    items={items}
                    disabled={disabled}
                    value={derivedValue as never}
                    onValueChange={(value) => field.handleChange(onFieldValueChange(value as never) as never)}
                />
            </FieldLayout>
        )
    }
}

export const ComboboxFieldSimple = createComboboxFieldSimple(undefined)
export const NullableComboboxFieldSimple = createComboboxFieldSimple(null)
