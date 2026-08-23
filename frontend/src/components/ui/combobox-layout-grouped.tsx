// combobox-layout-grouped.tsx
"use client"

import * as React from "react"

import {
    Combobox,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxCollection,
    ComboboxSeparator,
    ComboboxEmpty,
    useComboboxFilteredItems,
    useComboboxFilter,
} from "@/components/ui/combobox"
import {
    ComboboxLayoutChips,
    ComboboxLayoutTriggerShell,
    ComboboxLayoutSearchInput,
} from "./combobox-layout.parts"
import type {
    ComboboxLayoutGroup,
    ComboboxLayoutGroupedProps,
    ComboboxLayoutItem,
} from "./combobox-layout.shared"

function GroupedListBody<
    TItem extends ComboboxLayoutItem,
    TGroup extends ComboboxLayoutGroup<TItem>,
>({
    getGroupKey,
    renderGroupLabel,
    renderItem,
}: {
    getGroupKey: (group: TGroup, index: number) => React.Key
    renderGroupLabel: (group: TGroup) => React.ReactNode
    renderItem: (item: TItem) => React.ReactNode
}) {
    const filteredGroups = useComboboxFilteredItems<TGroup>()

    return (
        <ComboboxList>
            {filteredGroups.map((group, index) => (
                <React.Fragment key={getGroupKey(group, index)}>
                    <ComboboxGroup items={group.items}>
                        {group.label != null && <ComboboxLabel>{renderGroupLabel(group)}</ComboboxLabel>}
                        <ComboboxCollection>
                            {(item: TItem) => (
                                <ComboboxItem key={item.value} value={item}>
                                    {renderItem(item)}
                                </ComboboxItem>
                            )}
                        </ComboboxCollection>
                    </ComboboxGroup>
                    {index < filteredGroups.length - 1 && <ComboboxSeparator />}
                </React.Fragment>
            ))}
        </ComboboxList>
    )
}

export type ComboboxLayoutGroupedComponentProps<
    TItem extends ComboboxLayoutItem,
    TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
    Multiple extends boolean | undefined = false,
> = Omit<
    ComboboxLayoutGroupedProps<TItem, TGroup, Multiple>,
    "items"
> & {
        items: readonly (TGroup & ComboboxLayoutGroup<TItem>)[]
        placeholder?: string
        emptyMessage?: React.ReactNode
        showClear?: boolean
        showTrigger?: boolean
        className?: string
        contentClassName?: string
        getGroupKey?: (group: TGroup, index: number) => React.Key
        renderItem?: (item: TItem) => React.ReactNode
        renderGroupLabel?: (group: TGroup) => React.ReactNode
        searchByGroupLabel?: boolean
        groupToStringLabel?: (group: TGroup) => string
        renderChipsOnMultiple?: boolean
        placeholderSearch?: string
        trigger?: React.ReactElement
    }

export function ComboboxLayoutGrouped<
    TItem extends ComboboxLayoutItem,
    TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
    Multiple extends boolean | undefined = false,
>(props: ComboboxLayoutGroupedComponentProps<TItem, TGroup, Multiple>) {
    const {
        items,
        placeholder,
        className,
        contentClassName,
        multiple,
        showClear = false,
        showTrigger = false,
        emptyMessage = "No se encontraron resultados.",
        getGroupKey = (_group: TGroup, index: number) => index,
        renderItem = (item: TItem) => item.label,
        renderGroupLabel = (group: TGroup) => group.label,
        searchByGroupLabel = true,
        groupToStringLabel = (group: TGroup) => String(group.label),
        filter: filterProp,
        autoHighlight = true,
        renderChipsOnMultiple = false,
        placeholderSearch = "Buscar...",
        trigger,
        ...rootProps
    } = props

    const showChips = multiple && renderChipsOnMultiple
    const placeholderProp =
        placeholder !== undefined
            ? placeholder
            : showChips
                ? "Ingresa un valor"
                : "Selecciona una opción"

    const collatorFilter = useComboboxFilter()

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

    const resolvedFilter = React.useMemo(() => {
        if (filterProp !== undefined) return filterProp
        if (!searchByGroupLabel) return undefined
        return (
            item: TItem,
            query: string,
            itemToString?: (item: TItem) => string
        ) => {
            if (collatorFilter.contains(item, query, itemToString)) return true
            const groupLabelText = itemGroupLabel?.get(item.value)
            return groupLabelText ? collatorFilter.contains(groupLabelText, query) : false
        }
    }, [filterProp, searchByGroupLabel, collatorFilter, itemGroupLabel])

    return (
        <Combobox<TItem, Multiple>
            items={items}
            multiple={multiple}
            filter={resolvedFilter}
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
                <GroupedListBody
                    getGroupKey={getGroupKey}
                    renderGroupLabel={renderGroupLabel}
                    renderItem={renderItem}
                />
            </ComboboxContent>
        </Combobox>
    )
}

export function toComboboxGroups<
    TSource,
    TItem extends ComboboxLayoutItem,
    TGroup extends ComboboxLayoutGroup<TItem> = ComboboxLayoutGroup<TItem>,
>(
    source: readonly TSource[],
    toGroup: (source: TSource, index: number) => TGroup
): TGroup[] {
    return source.map(toGroup)
}
