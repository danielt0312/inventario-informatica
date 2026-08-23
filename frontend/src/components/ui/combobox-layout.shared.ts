// combobox-layout.shared.ts
import type * as React from "react"
import type { ComboboxRoot } from "@base-ui/react/combobox"

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
 *
 * Nota: sin `Record<string, unknown>` — no hace falta una firma de
 * índice para permitir campos extra; un tipo que extiende esta forma
 * vía genérico ya puede traer propiedades adicionales sin problema.
 */
export type ComboboxLayoutGroup<TItem extends ComboboxLayoutItem> = {
  label: React.ReactNode
  items: readonly TItem[]
}

/**
 * Patch base: reutiliza todo lo que Base UI ya tipa correctamente
 * contra `Value` (multiple, value, defaultValue, onValueChange,
 * itemToStringLabel, itemToStringValue, isItemEqualToValue,
 * autoHighlight, highlightItemOnHover, onItemHighlighted, filter, etc.)
 * y solo sobrescribe `items`/`filteredItems`, que en Base UI vienen
 * como `readonly any[] | readonly Group<any>[]` sin ligar a `Value`.
 */
type BaseLayoutProps<
  TItem extends ComboboxLayoutItem,
  Multiple extends boolean | undefined,
  TItems,
> = Omit<ComboboxRoot.Props<TItem, Multiple>, "items" | "filteredItems"> & {
  items?: TItems | undefined
  filteredItems?: TItems | undefined
}

/** Props del root para el layout plano (lista simple de items). */
export type ComboboxLayoutSimpleProps<
  TItem extends ComboboxLayoutItem,
  Multiple extends boolean | undefined = false,
> = BaseLayoutProps<TItem, Multiple, readonly TItem[]>

/** Props del root para el layout agrupado (lista de grupos con items). */
export type ComboboxLayoutGroupedProps<
  TItem extends ComboboxLayoutItem,
  TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
  Multiple extends boolean | undefined = false,
> = BaseLayoutProps<TItem, Multiple, readonly TGroup[]>
