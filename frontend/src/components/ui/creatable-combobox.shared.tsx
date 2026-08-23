"use client"

import * as React from "react"
import { CirclePlusIcon } from "lucide-react"
import { useComboboxFilter, type ComboboxChangeEventDetails } from "./combobox";

export const CREATABLE_VALUE = "__creatable__" as const

export type CreatableSentinelItem = {
  value: typeof CREATABLE_VALUE
  label: React.ReactNode
  query: string
}

export function isCreatableSentinel(item: unknown): item is CreatableSentinelItem {
  return typeof item === "object" && item !== null && (item as any).value === CREATABLE_VALUE
}

export function defaultRenderCreateOption(query: string) {
  return (
    <span className="flex items-center gap-2">
      <CirclePlusIcon className="size-4" />
      {query === "" ? "Presiona para crear" : `Crear "${query}"`}
    </span>
  )
}

function normalize(text: string) {
  return text.trim().toLowerCase()
}

/** Rastrea la query actual, encadenando el onInputValueChange del consumidor. */
export function useCreatableQuery(
  onInputValueChangeProp?: (value: string, details: ComboboxChangeEventDetails) => void
) {
  const [query, setQuery] = React.useState("")
  const onInputValueChange = React.useCallback(
    (value: string, details: ComboboxChangeEventDetails) => {
      setQuery(value)
      onInputValueChangeProp?.(value, details)
    },
    [onInputValueChangeProp]
  )
  return [query, onInputValueChange] as const
}

export function useCreatableSentinelItem(
  query: string,
  renderCreateOption: (query: string) => React.ReactNode
) {
  return React.useMemo<CreatableSentinelItem>(
    () => ({ value: CREATABLE_VALUE, label: renderCreateOption(query), query }),
    [query, renderCreateOption]
  )
}

/**
 * Decide si debe mostrarse el sentinel:
 * - `totalItemCount === 0` → siempre (sin importar la query), para no
 *   caer en el emptyMessage cuando aún no existe ningún item.
 * - si hay items pero la query no está vacía y ninguno coincide
 *   exactamente → se agrega al final de los resultados.
 * - si hay items y la query está vacía (sin búsqueda activa) → no aparece.
 */
export function useShowCreatableSentinel(params: {
  query: string
  totalItemCount: number
  someLabelMatches: (normalizedQuery: string) => boolean
}) {
  return React.useMemo(() => {
    if (params.totalItemCount === 0) return true
    if (params.query === "") return false
    return !params.someLabelMatches(normalize(params.query))
  }, [params.totalItemCount, params.query, params.someLabelMatches])
}

/** El wrapper SIEMPRE controla `value` hacia el layout interno (soporta
 * también el caso donde el consumidor no pasa `value`/`onValueChange`,
 * comportándose como no-controlado desde su perspectiva). Es necesario
 * para poder "revertir" la selección del sentinel en el mismo render. */
export function useControllableValue<TValue>(
  valueProp: TValue | undefined,
  defaultValue: TValue,
  onChangeProp?: (value: TValue, details: ComboboxChangeEventDetails) => void
) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = valueProp !== undefined
  const currentValue = isControlled ? valueProp : internalValue

  const setValue = React.useCallback(
    (value: TValue, details: ComboboxChangeEventDetails) => {
      if (!isControlled) setInternalValue(value)
      onChangeProp?.(value, details)
    },
    [isControlled, onChangeProp]
  )

  return [currentValue, setValue] as const
}

/** El sentinel siempre "matchea", sin importar su label (que es JSX,
 * no string) — así Base UI nunca lo excluye de `filteredItems` al
 * escribir. Los items reales siguen tu filtrado normal (o el default). */
export function useCreatableFilter<TItem>(
  baseFilter?: (
    item: TItem,
    query: string,
    itemToString?: (item: TItem) => string
  ) => boolean
) {
  const collatorFilter = useComboboxFilter()
  return React.useCallback(
    (item: unknown, query: string, itemToString?: (item: unknown) => string) => {
      if (isCreatableSentinel(item)) return true
      if (baseFilter) return baseFilter(item as TItem, query, itemToString as never)
      return collatorFilter.contains(item, query, itemToString)
    },
    [baseFilter, collatorFilter]
  )
}
