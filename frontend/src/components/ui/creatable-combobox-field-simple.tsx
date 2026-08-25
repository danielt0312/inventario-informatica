import { CreatableComboboxSimple } from "./creatable-combobox-simple"
import type { CreatableComboboxSimpleProps } from "./creatable-combobox-simple"
import type { ComboboxLayoutItem } from "./combobox-layout.shared"
import { FieldLayout, type CoreFieldLayoutProps } from "./field-layout"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
} from "./combobox-field.shared"

type CreatableComboboxFieldSimpleProps<
    TItem extends ComboboxLayoutItem,
    Multiple extends boolean | undefined = false,
    TEmpty extends ComboboxFieldEmptyType = undefined,
> = Omit<CreatableComboboxSimpleProps<TItem, Multiple>, "value" | "onValueChange"> & {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">
    onFieldValueChange?: (
        value: Multiple extends true ? TItem[] : TItem | TEmpty
    ) => ComboboxFieldType<Multiple, TEmpty>
}

function createCreatableComboboxFieldSimple<TEmpty extends ComboboxFieldEmptyType>(emptyValue: TEmpty) {
    return function CreatableComboboxFieldSimpleImpl<
        TItem extends ComboboxLayoutItem,
        Multiple extends boolean | undefined = false,
    >(props: CreatableComboboxFieldSimpleProps<TItem, Multiple, TEmpty>) {
        const {
            items,
            layout,
            className,
            required,
            disabled,
            onFieldValueChange = defaultFieldValueFromItem(emptyValue),
            ...comboboxProps
        } = props

        const field = useFieldContext<ComboboxFieldType<Multiple, TEmpty>>()
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
                <CreatableComboboxSimple<TItem, Multiple>
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

export const CreatableComboboxFieldSimple = createCreatableComboboxFieldSimple(undefined)
export const NullableCreatableComboboxFieldSimple = createCreatableComboboxFieldSimple(null)
