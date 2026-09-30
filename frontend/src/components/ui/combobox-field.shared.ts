import * as React from "react"
import type { ComboboxLayoutItem, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import { useFieldContext } from "./form-context"

export type ComboboxFieldEmptyType = undefined | null

export type ComboboxFieldType<
    Empty extends ComboboxFieldEmptyType,
    Multiple extends boolean | undefined,
    Value extends React.Key = number,
> = Multiple extends true ? Value[] | Empty : Value | Empty

/** Deriva el TItem (o TItem[]) real a partir del primitivo que vive en
 * TanStack Form + los `items` disponibles — nunca depende de que el
 * consumidor pase el objeto completo por fuera en paralelo al field. */
export function useComboboxFieldValue<
    Item extends ComboboxLayoutItem,
    Multiple extends boolean | undefined,
    Empty extends ComboboxFieldEmptyType,
>(
    items: readonly Item[],
    fieldValue: ComboboxFieldType<Empty, Multiple>,
    multiple: Multiple,
    emptyValue: Empty
): Multiple extends true ? Item[] : Item | Empty {
    return React.useMemo(() => {
        if (multiple) {
            const keys = (fieldValue as React.Key[] | Empty) ?? []
            return items.filter((item) =>
                (keys as React.Key[]).includes(item.value)
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

export const useComboboxFieldContext = <Empty extends ComboboxFieldEmptyType, Multiple extends ComboboxLayoutMultiple>() => useFieldContext<ComboboxFieldType<Empty, Multiple>>();
