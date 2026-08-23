// creatable-combobox-grouped.tsx
"use client"
import * as React from "react"

import { ComboboxLayoutGrouped } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroupedComponentProps } from "./combobox-layout-grouped"
import type { ComboboxLayoutGroup, ComboboxLayoutItem } from "./combobox-layout.shared"
import {
  isCreatableSentinel,
  defaultRenderCreateOption,
  useCreatableQuery,
  useCreatableSentinelItem,
  useShowCreatableSentinel,
  useControllableValue,
} from "./creatable-combobox.shared"
import { useComboboxFilter, type ComboboxChangeEventDetails } from "./combobox"

export type CreatableComboboxGroupedProps<
  TItem extends ComboboxLayoutItem,
  TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
  Multiple extends boolean | undefined = false,
> = Omit<
  ComboboxLayoutGroupedComponentProps<TItem, TGroup, Multiple>,
  "value" | "onValueChange" | "open" | "onOpenChange"
> & {
  value?: Multiple extends true ? TItem[] : TItem | null
  onValueChange?: (
    value: Multiple extends true ? TItem[] : TItem | null,
    details: unknown
  ) => void
  onCreate: (query: string) => void
  renderCreateOption?: (query: string) => React.ReactNode
//   itemToStringLabel?: (item: TItem) => string
}

export function CreatableComboboxGrouped<
  TItem extends ComboboxLayoutItem,
  TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
  Multiple extends boolean | undefined = false,
>(props: CreatableComboboxGroupedProps<TItem, TGroup, Multiple>) {
  const {
    items,
    multiple,
    value,
    onValueChange,
    onCreate,
    renderItem,
    renderGroupLabel,
    filter,
    renderCreateOption = defaultRenderCreateOption,
    itemToStringLabel = (item: TItem) => item.label,
    onInputValueChange: onInputValueChangeProp,
    searchByGroupLabel = true,
    groupToStringLabel = (group: TGroup) => String(group.label),
    ...rest
  } = props

  const [open, setOpen] = React.useState(false)
  const [query, onInputValueChange] = useCreatableQuery(onInputValueChangeProp)
  const sentinel = useCreatableSentinelItem(query, renderCreateOption)

  const [currentValue, setCurrentValue] = useControllableValue(
    value as never,
    (multiple ? [] : null) as never,
    onValueChange as never
  )

  const totalItemCount = React.useMemo(
    () => items.reduce((total, group) => total + group.items.length, 0),
    [items]
  )

  const itemGroupLabel = React.useMemo(() => {
    if (!searchByGroupLabel) return undefined
    const map = new Map<TItem["value"], string>()
    for (const group of items) {
      const groupLabelText = groupToStringLabel(group)
      for (const item of group.items) {
        map.set(item.value, groupLabelText)
      }
    }
    return map
  }, [items, searchByGroupLabel, groupToStringLabel])

  const showSentinel = useShowCreatableSentinel({
    query,
    totalItemCount,
    someLabelMatches: (normalizedQuery) =>
      items.some((group) =>
        group.items.some(
          (item) => itemToStringLabel(item).trim().toLowerCase() === normalizedQuery
        )
      ),
  })

  const groupsWithSentinel = React.useMemo(() => {
    if (!showSentinel) return items
    const creatableGroup = { label: null, items: [sentinel] }
    return [...items, creatableGroup]
  }, [items, showSentinel, sentinel])

  const collatorFilter = useComboboxFilter()

  const resolvedFilter = React.useCallback(
  (
    item: unknown,
    q: string,
    itemToString?: (item: unknown) => string
  ): boolean => {
    if (isCreatableSentinel(item)) return true
    if (filter) {
      return (
        filter as (
          item: unknown,
          q: string,
          itemToString?: (item: unknown) => string
        ) => boolean
      )(item, q, itemToString)
    }
    if (!searchByGroupLabel) return collatorFilter.contains(item, q, itemToString)
    if (collatorFilter.contains(item, q, itemToString)) return true
    const groupLabelText = itemGroupLabel?.get((item as TItem).value)
    return groupLabelText ? collatorFilter.contains(groupLabelText, q) : false
  },
  [filter, searchByGroupLabel, collatorFilter, itemGroupLabel]
)

  const handleValueChange = React.useCallback(
    (newValue: unknown, details: ComboboxChangeEventDetails) => {
      const picked = multiple
        ? (newValue as unknown[]).find(isCreatableSentinel)
        : isCreatableSentinel(newValue)
          ? newValue
          : undefined

      if (picked) {
        setOpen(false)
        onCreate(picked.query)
        return
      }
      setCurrentValue(newValue as never, details)
    },
    [multiple, onCreate, setCurrentValue]
  )

  const isCreatableGroup = (group: { items: readonly unknown[] }) =>
    group.items.length === 1 && isCreatableSentinel(group.items[0])

  return (
    <ComboboxLayoutGrouped
      {...(rest as ComboboxLayoutGroupedComponentProps<TItem, TGroup, Multiple>)}
      items={groupsWithSentinel as never}
      multiple={multiple}
      value={currentValue as never}
      filter={resolvedFilter as never}
      open={open}
      onOpenChange={setOpen}
      onInputValueChange={onInputValueChange}
      onValueChange={handleValueChange as never}
      renderGroupLabel={
        ((group: TGroup) =>
          isCreatableGroup(group) ? null : (renderGroupLabel?.(group) ?? group.label)) as never
      }
      renderItem={
        ((item: TItem | typeof sentinel) =>
          isCreatableSentinel(item)
            ? item.label
            : (renderItem?.(item as TItem) ?? (item as TItem).label)) as never
      }
    />
  )
}
