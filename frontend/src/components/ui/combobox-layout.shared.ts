import type * as React from "react"
import type { ComboboxRoot } from "@base-ui/react/combobox"
import type { CoreFieldLayoutProps } from "./field-layout"

/**
 * Forma mínima obligatoria para un item seleccionable.
 * `value` amarrado a React.Key (primitivo usable como identificador/key),
 * no a un objeto completo — decisión tomada porque el caso de uso real
 * siempre usa identificadores primitivos.
 *
 * Cualquier metadata adicional de dominio es libre: TItem puede traer
 * los campos extra que necesites además de value/label.
 */
export type ComboboxLayoutItem<TValue extends React.Key = React.Key> = {
    value: TValue
    label: string
}

/**
 * Forma mínima obligatoria para un grupo. `label` amarrado por
 * consistencia con ComboboxLayoutItem (decisión de API propia,
 * Base UI no impone ninguna convención de label para grupos).
 */
export type ComboboxLayoutGroup<TItem extends ComboboxLayoutItem> = {
    label: React.ReactNode
    items: readonly TItem[]
}

export type ComboboxLayoutMultiple = boolean | undefined;

/**
 * Patch base: reutiliza todo lo que Base UI ya tipa correctamente
 * contra `Value` (multiple, value, defaultValue, onValueChange,
 * itemToStringLabel, itemToStringValue, isItemEqualToValue,
 * autoHighlight, highlightItemOnHover, onItemHighlighted, filter, etc.)
 * y solo sobrescribe `items`/`filteredItems`, que en Base UI vienen
 * como `readonly any[] | readonly Group<any>[]` sin ligar a `Value`.
 */
type BaseLayoutProps<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Items,
> = Omit<ComboboxRoot.Props<Item, Multiple>, "items" | "filteredItems"> & {
    items?: Items | undefined
    filteredItems?: Items | undefined
}

export type ComboboxLayoutSharedUIProps<TItem extends ComboboxLayoutItem> = {
    layout?: Omit<CoreFieldLayoutProps, "required" | "disabled" | "className">;
    placeholder?: string
    emptyMessage?: React.ReactNode
    showClear?: boolean
    showTrigger?: boolean
    className?: string
    contentClassName?: string
    renderItem?: (item: TItem) => React.ReactNode
    renderSelectedItem?: (item: TItem) => React.ReactNode
    renderChipsOnMultiple?: boolean
    placeholderSearch?: string
    trigger?: React.ReactElement
}

/** Props del root para el layout plano (lista simple de items). */
export type ComboboxLayoutSimpleProps<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = BaseLayoutProps<Multiple, Item, readonly Item[]>

/** Props del root para el layout agrupado (lista de grupos con items). */
export type ComboboxLayoutGroupedProps<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
> = BaseLayoutProps<Multiple, Item, readonly Group[]>

export function toComboboxItems<TSource, TItem extends ComboboxLayoutItem>(
    source: readonly TSource[],
    toItem: (source: TSource, index: number) => TItem
): TItem[] {
    return source.map(toItem)
}

export function toComboboxGroups<
    Source,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>
>(
    source: readonly Source[],
    toGroup: (source: Source, index: number) => Group
): Group[] {
    return source.map(toGroup)
}

export type InferComboboxItemFromFn<
    T extends (...args: any[]) => readonly ComboboxLayoutItem<any>[]
> = ReturnType<T>[number]


export type InferComboboxGroupFromFn<
    T extends (...args: any[]) => readonly ComboboxLayoutGroup<any>[]
> = ReturnType<T>[number]

export type InferComboboxGroupItemFromFn<
    T extends (...args: any[]) => readonly ComboboxLayoutGroup<any>[]
> = InferComboboxGroupFromFn<T>["items"][number]
