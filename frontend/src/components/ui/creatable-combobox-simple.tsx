"use client"

import * as React from "react"

import { ComboboxLayoutSimple, type ComboboxLayoutSimpleComponentProps } from "./combobox-layout-simple"
import type { ComboboxLayoutItem, ComboboxLayoutMultiple } from "./combobox-layout.shared"
import {
    isCreatableSentinel,
    defaultRenderCreateOption,
    useCreatableQuery,
    useCreatableSentinelItem,
    useShowCreatableSentinel,
    useControllableValue,
    useCreatableFilter,
} from "./creatable-combobox.shared"
import type { ComboboxChangeEventDetails } from "./combobox"

export type CreatableComboboxSimpleProps<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = Omit<
    ComboboxLayoutSimpleComponentProps<Multiple, Item>,
    "open" | "onOpenChange"
> & {
    onCreate: (query: string) => void
    renderCreateOption?: (query: string) => React.ReactNode
    itemToStringLabel?: (item: Item) => string
}

export function CreatableComboboxSimple<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
>(props: CreatableComboboxSimpleProps<Multiple, Item>) {
    const {
        items,
        multiple,
        onValueChange,
        onCreate,
        renderItem,
        onInputValueChange: onInputValueChangeProp,
        renderCreateOption = defaultRenderCreateOption,
        itemToStringLabel = (item: Item) => String(item.label),
        ...rest
    } = props

    const [open, setOpen] = React.useState(false)
    const [query, onInputValueChange] = useCreatableQuery(onInputValueChangeProp)
    const sentinel = useCreatableSentinelItem(query, renderCreateOption)
    const resolvedFilter = useCreatableFilter<Item>()

    const showSentinel = useShowCreatableSentinel({
        query,
        totalItemCount: items.length,
        someLabelMatches: (normalizedQuery) =>
            items.some(
                (item) => itemToStringLabel(item).trim().toLowerCase() === normalizedQuery
            ),
    })

    const itemsWithSentinel = React.useMemo(
        () => (showSentinel ? [...items, sentinel] : items),
        [items, showSentinel, sentinel]
    )

    const [currentValue, setCurrentValue] = useControllableValue(
        props.value as never,
        (multiple ? [] : null) as never,
        onValueChange
    )

    const handleValueChange = React.useCallback(
        (value: unknown, details: ComboboxChangeEventDetails) => {
            const picked = multiple
                ? (value as unknown[]).find(isCreatableSentinel)
                : isCreatableSentinel(value)
                    ? value
                    : undefined

            if (picked) {
                setOpen(false)
                onCreate(picked.query)
                return
            }
            setCurrentValue(value as never, details)
        },
        [multiple, onCreate, setCurrentValue]
    )

    return (
        <ComboboxLayoutSimple
            {...(rest as ComboboxLayoutSimpleComponentProps<Multiple, Item>)}
            items={itemsWithSentinel as never}
            multiple={multiple}
            value={currentValue as never}
            filter={resolvedFilter as never}
            open={open}
            onOpenChange={setOpen}
            onInputValueChange={onInputValueChange}
            onValueChange={handleValueChange}
            renderItem={
                ((item: Item | typeof sentinel) =>
                    isCreatableSentinel(item) || !renderItem
                        ? item.label
                        : renderItem(item))
            }
        />
    )
}
