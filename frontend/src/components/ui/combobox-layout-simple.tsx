// combobox-layout.tsx
"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox"
import {
  ComboboxLayoutChips,
  ComboboxLayoutTriggerShell,
  ComboboxLayoutSearchInput,
} from "./combobox-layout.parts"
import type {
  ComboboxLayoutItem,
  ComboboxLayoutSimpleProps,
} from "./combobox-layout.shared"

export type ComboboxLayoutSimpleComponentProps<
  TItem extends ComboboxLayoutItem,
  Multiple extends boolean | undefined = false,
> = Omit<ComboboxLayoutSimpleProps<TItem, Multiple>, "items"> & {
  items: readonly TItem[]
  placeholder?: string
  emptyMessage?: React.ReactNode
  showClear?: boolean
  showTrigger?: boolean
  className?: string
  contentClassName?: string
  renderItem?: (item: TItem) => React.ReactNode
  renderChipsOnMultiple?: boolean
  placeholderSearch?: string
  /** Elemento completo a usar como trigger, reemplazando el Button
   * default. Ver ComboboxLayoutTriggerShell. */
  trigger?: React.ReactElement
}

export function ComboboxLayoutSimple<
  TItem extends ComboboxLayoutItem,
  Multiple extends boolean | undefined = false,
>(props: ComboboxLayoutSimpleComponentProps<TItem, Multiple>) {
  const {
    items,
    placeholder,
    emptyMessage = "No se encontraron resultados.",
    showClear = false,
    showTrigger = false,
    className,
    contentClassName,
    multiple,
    trigger,
    renderItem = (item: TItem) => item.label,
    autoHighlight = true,
    renderChipsOnMultiple = false,
    placeholderSearch = "Buscar...",
    ...rootProps
  } = props

  const showChips = multiple && renderChipsOnMultiple
  const placeholderProp =
    placeholder !== undefined
      ? placeholder
      : showChips
        ? "Ingresa un valor"
        : "Selecciona una opción"

  return (
    <Combobox<TItem, Multiple>
      items={items}
      multiple={multiple}
      autoHighlight={autoHighlight}
      {...rootProps}
    >
      {showChips ? (
        <ComboboxLayoutChips
          className={className}
          placeholder={placeholderProp}
          renderItem={renderItem}
        />
      ) : (
        <ComboboxLayoutTriggerShell
          trigger={trigger}
          placeholder={placeholderProp}
          renderItem={renderItem}
        />
      )}
      <ComboboxContent className={contentClassName}>
        {!showChips && (
          <ComboboxLayoutSearchInput
            placeholder={placeholderSearch}
            showClear={showClear}
            showTrigger={showTrigger}
            className={className}
          />
        )}
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item: TItem) => (
            <ComboboxItem key={item.value} value={item}>
              {renderItem(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function toComboboxItems<TSource, TItem extends ComboboxLayoutItem>(
    source: readonly TSource[],
    toItem: (source: TSource, index: number) => TItem
): TItem[] {
    return source.map(toItem)
}
