import type { ComboboxLayoutItem, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { useFieldContext } from "./form-context"
import {
    useComboboxFieldValue,
    defaultFieldValueFromItem,
    type ComboboxFieldEmptyType,
    type ComboboxFieldType,
} from "./combobox-field.shared"
import { CreatableComboboxSimple, type CreatableComboboxSimpleProps } from "./creatable-combobox-simple"

type CreatableComboboxLayoutFieldSimpleProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = Omit<CreatableComboboxSimpleProps<Multiple, Item>, 'value' | 'onValueChange'> & {
    onFieldValueChange?: (
        value: Multiple extends true ? Item[] : Item | Empty
    ) => ComboboxFieldType<Empty, Multiple>
}

type CreatableComboboxFieldSimpleBaseProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = CreatableComboboxLayoutFieldSimpleProps<Empty, Multiple, Item> & {
    emptyValue: Empty;
}

function CreatableComboboxFieldSimpleBase<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
>({
    emptyValue,
    ...props
}: CreatableComboboxFieldSimpleBaseProps<Empty, Multiple, Item>) {
    const {
        items,
        layout,
        onFieldValueChange = defaultFieldValueFromItem(emptyValue),
        ...comboboxProps
    } = props

    const field = useFieldContext<ComboboxFieldType<Empty, Multiple>>()
    const derivedValue = useComboboxFieldValue(
        items,
        field.state.value,
        comboboxProps.multiple,
        emptyValue
    )

    return (
        <CreatableComboboxSimple<Multiple, Item>
            {...comboboxProps}
            layout={{
                errors: field.state.meta.errors,
                ...layout
            }}
            items={items}
            value={derivedValue as never}
            onValueChange={(value) => field.handleChange(onFieldValueChange(value as never) as never)}
        />
    );
}

function createCreatableComboboxFieldSimple<Empty extends ComboboxFieldEmptyType>(
    emptyValue: Empty
) {
    return function CreatableComboboxFieldSimpleImpl<
        Item extends ComboboxLayoutItem,
        Multiple extends ComboboxLayoutMultiple,
    >(props: CreatableComboboxLayoutFieldSimpleProps<Empty, Multiple, Item>) {
        return (
            <CreatableComboboxFieldSimpleBase<Empty, Multiple, Item>
                {...props}
                emptyValue={emptyValue}
            />
        )
    }
}

const CreatableComboboxFieldSimple = createCreatableComboboxFieldSimple(undefined)
const NullableCreatableComboboxFieldSimple = createCreatableComboboxFieldSimple(null)

export {
    CreatableComboboxFieldSimpleBase,
    CreatableComboboxFieldSimple,
    NullableCreatableComboboxFieldSimple,
    type CreatableComboboxLayoutFieldSimpleProps,
    type CreatableComboboxFieldSimpleBaseProps
}
