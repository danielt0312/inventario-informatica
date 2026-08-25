import * as React from "react"
import type { ComboboxLayoutItem } from "./combobox-layout.shared"

export type ComboboxFieldEmptyType = undefined | null

export type ComboboxFieldType<
    Multiple extends boolean | undefined,
    TEmpty extends ComboboxFieldEmptyType,
> = Multiple extends true ? React.Key[] | TEmpty : React.Key | TEmpty

/** Deriva el TItem (o TItem[]) real a partir del primitivo que vive en
 * TanStack Form + los `items` disponibles — nunca depende de que el
 * consumidor pase el objeto completo por fuera en paralelo al field. */
export function useComboboxFieldValue<
    TItem extends ComboboxLayoutItem,
    Multiple extends boolean | undefined,
    TEmpty extends ComboboxFieldEmptyType,
>(
    items: readonly TItem[],
    fieldValue: ComboboxFieldType<Multiple, TEmpty>,
    multiple: Multiple,
    emptyValue: TEmpty
): Multiple extends true ? TItem[] : TItem | TEmpty {
    return React.useMemo(() => {
        if (multiple) {
            const keys = (fieldValue as React.Key[] | TEmpty) ?? []
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
