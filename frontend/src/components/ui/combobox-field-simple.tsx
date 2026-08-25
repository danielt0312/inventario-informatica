import { ComboboxLayoutSimple } from "./combobox-layout-simple"
import type { ComboboxLayoutSimpleComponentProps } from "./combobox-layout-simple"
import type { ComboboxLayoutItem } from "./combobox-layout.shared"
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
    useComboboxFieldContext,
} from "./combobox-field.shared"

type ComboboxFieldSimpleProps<
    TItem extends ComboboxLayoutItem,
    Multiple extends boolean | undefined = false,
    TEmpty extends ComboboxFieldEmptyType = undefined,
> = Omit<ComboboxLayoutSimpleComponentProps<TItem, Multiple>, "value" | "onValueChange"> & {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">
    onFieldValueChange?: (
        value: Multiple extends true ? TItem[] : TItem | TEmpty
    ) => ComboboxFieldType<Multiple, TEmpty>
}

function createComboboxFieldSimple<TEmpty extends ComboboxFieldEmptyType>(emptyValue: TEmpty) {
    return function ComboboxFieldSimpleImpl<
        TItem extends ComboboxLayoutItem,
        Multiple extends boolean | undefined = false,
    >(props: ComboboxFieldSimpleProps<TItem, Multiple, TEmpty>) {
        const {
            items,
            layout,
            className,
            required,
            disabled,
            onFieldValueChange = defaultFieldValueFromItem(emptyValue),
            ...comboboxProps
        } = props

        const field = useComboboxFieldContext<Multiple, TEmpty>()
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
                <ComboboxLayoutSimple<TItem, Multiple>
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

export const ComboboxFieldSimple = createComboboxFieldSimple(undefined)
export const NullableComboboxFieldSimple = createComboboxFieldSimple(null)
