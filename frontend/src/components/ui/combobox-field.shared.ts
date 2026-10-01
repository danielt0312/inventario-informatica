import * as React from "react"
import type { ComboboxLayoutItem, ComboboxLayoutItemValue, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { useFieldContext } from "./form-context"

export type ComboboxFieldEmptyType = undefined | null

export type ComboboxFieldType<
    Value extends ComboboxLayoutItemValue,
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
> = Multiple extends true ? Value[] | Empty : Value | Empty

export type ComboboxFieldSharedUIProps<
    Value extends ComboboxLayoutItemValue,
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem
> = {
    onFieldValueChange?: (
        value: Multiple extends true ? Item[] : Item | Empty
    ) => ComboboxFieldType<Value, Empty, Multiple>
    emptyValue?: Empty
}

/** Deriva el TItem (o TItem[]) real a partir del primitivo que vive en
 * TanStack Form + los `items` disponibles — nunca depende de que el
 * consumidor pase el objeto completo por fuera en paralelo al field. */
export function useComboboxFieldValue<
    Value extends React.Key,
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
>(
    items: readonly Item[],
    fieldValue: ComboboxFieldType<Value, Empty, Multiple>,
    multiple: Multiple,
    emptyValue: Empty
): Multiple extends true ? Item[] : Item | Empty {
    return React.useMemo(() => {
        if (multiple) {
            const keys = (fieldValue as ComboboxLayoutItemValue[] | Empty) ?? []
            return items.filter((item) =>
                (keys as ComboboxLayoutItemValue[]).includes(item.value)
            ) as never
        }
        const found = items.find((item) => item.value === fieldValue)
        return (found ?? emptyValue) as never
    }, [items, fieldValue, multiple, emptyValue])
}

export function defaultFieldValueFromItem<TEmpty extends ComboboxFieldEmptyType>(
    emptyValue: TEmpty
) {
    return (value: ComboboxLayoutItem | ComboboxLayoutItem[] | null) =>
        Array.isArray(value)
            ? value.map((v) => v.value)
            : (value?.value ?? emptyValue)
}

export const useComboboxFieldContext = <Value extends ComboboxLayoutItemValue, Empty extends ComboboxFieldEmptyType, Multiple extends ComboboxLayoutMultiple>() => useFieldContext<ComboboxFieldType<Value, Empty, Multiple>>();
