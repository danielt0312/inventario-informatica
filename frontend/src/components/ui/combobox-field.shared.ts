import * as React from "react"
import type { ComboboxLayoutItem, ComboboxLayoutItemValue, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { useFieldContext } from "./form-context"

export type ComboboxFieldEmptyType = undefined | null

export type ComboboxFieldType<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Value extends ComboboxLayoutItemValue,
> = Multiple extends true ? Value[] | Empty : Value | Empty

export type ComboboxFieldSharedUIProps<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem
> = {
    onFieldValueChange?: (
        value: Multiple extends true ? Item[] : Item | Empty
    ) => ComboboxFieldType<Empty, Multiple, Item['value']>
    emptyValue?: Empty
}

/** Deriva el TItem (o TItem[]) real a partir del primitivo que vive en
 * TanStack Form + los `items` disponibles — nunca depende de que el
 * consumidor pase el objeto completo por fuera en paralelo al field. */
export function useComboboxFieldValue<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
>(
    items: readonly Item[],
    fieldValue: ComboboxFieldType<Empty, Multiple, Item['value']>,
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

export const useComboboxFieldContext = <Empty extends ComboboxFieldEmptyType, Multiple extends ComboboxLayoutMultiple, Value extends ComboboxLayoutItemValue>() => useFieldContext<ComboboxFieldType<Empty, Multiple, Value>>();
