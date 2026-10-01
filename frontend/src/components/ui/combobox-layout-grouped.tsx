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
    ComboboxInput,
} from "@/components/ui/combobox"
import {
    ComboboxLayoutChips,
    ComboboxLayoutTriggerShell,
    ComboboxLayoutSearchInput,
} from "./combobox-layout.parts"
import {
    resolveTriggerVariant,
    type ComboboxLayoutGroup,
    type ComboboxLayoutGroupedProps,
    type ComboboxLayoutItem,
    type ComboboxLayoutMultiple,
    type ComboboxLayoutSharedUIProps,
} from "./combobox-layout.shared"
import { FieldLayout } from "./field-layout"

function GroupedListBody<
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item>,
>({
    getGroupKey,
    renderGroupLabel,
    renderItem,
}: {
    getGroupKey: (group: Group, index: number) => React.Key
    renderGroupLabel: (group: Group) => React.ReactNode
    renderItem: (item: Item) => React.ReactNode
}) {
    const filteredGroups = useComboboxFilteredItems<Group>()

    return (
        <ComboboxList>
            {filteredGroups.map((group, index) => (
                <React.Fragment key={getGroupKey(group, index)}>
                    <ComboboxGroup items={group.items}>
                        {group.label != null && <ComboboxLabel>{renderGroupLabel(group)}</ComboboxLabel>}
                        <ComboboxCollection>
                            {(item: Item) => (
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
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
> = Omit<ComboboxLayoutGroupedProps<Multiple, Item, Group>, "items"> &
    ComboboxLayoutSharedUIProps<Item> & {
        items: readonly (Group & ComboboxLayoutGroup<Item>)[]
        getGroupKey?: (group: Group, index: number) => React.Key
        renderGroupLabel?: (group: Group) => React.ReactNode
        searchByGroupLabel?: boolean
        groupToStringLabel?: (group: Group) => string
    }

export function ComboboxLayoutGrouped<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
    Group extends ComboboxLayoutGroup<Item> = ComboboxLayoutGroup<Item>,
>(props: ComboboxLayoutGroupedComponentProps<Multiple, Item, Group>) {
    const {
        items,
        placeholder,
        className,
        contentClassName,
        multiple,
        required,
        disabled,
        layout,
        value,
        showTrigger,
        trigger,
        triggerVariant,
        showClear = false,
        filter: filterProp,
        emptyMessage = "No se encontraron resultados.",
        getGroupKey = (_group: Group, index: number) => index,
        renderItem = (item: Item) => item.label,
        renderSelectedItem = (item: Item) => item.label,
        renderSelectedItems = (items: Item[]) => items.map((i) => i.label).join(", "),
        renderGroupLabel = (group: Group) => group.label,
        searchByGroupLabel = true,
        groupToStringLabel = (group: Group) => String(group.label),
        autoHighlight = true,
        renderChipsOnMultiple = false,
        placeholderSearch = "Buscar...",
        ...rootProps
    } = props

    const variant = resolveTriggerVariant(triggerVariant, multiple, renderChipsOnMultiple)
    const asChips = variant === "input" && !!multiple
    const asInput = variant === "input" && !multiple
    const showTriggerResolved = showTrigger ?? variant === "input"

    const placeholderProp =
        placeholder !== undefined
            ? placeholder
            : asChips
                ? "Ingresa un valor"
                : "Selecciona una opción"

    const collatorFilter = useComboboxFilter()

    const itemGroupLabel = React.useMemo(() => {
        if (!searchByGroupLabel) return undefined
        const map = new Map<Item["value"], string>()
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
            item: Item,
            query: string,
            itemToString?: (item: Item) => string
        ) => {
            if (collatorFilter.contains(item, query, itemToString)) return true
            const groupLabelText = itemGroupLabel?.get(item.value)
            return groupLabelText ? collatorFilter.contains(groupLabelText, query) : false
        }
    }, [filterProp, searchByGroupLabel, collatorFilter, itemGroupLabel])

    return (
        <FieldLayout
            fieldLayout={{
                required,
                disabled,
                ...layout
            }}
            className={className}
        >
            <Combobox<Item, Multiple>
                {...rootProps}
                items={items}
                multiple={multiple}
                filter={resolvedFilter}
                autoHighlight={autoHighlight}
                value={value ?? null}
                // required={required}
                disabled={disabled}
            >
                {asChips ? (
                    <ComboboxLayoutChips
                        placeholder={placeholderProp}
                        renderItem={renderSelectedItem}
                    />
                ) : asInput ? (
                    <ComboboxInput
                        placeholder={placeholderProp}
                        showClear={showClear}
                        showTrigger={showTriggerResolved}
                    />
                ) : (
                    <ComboboxLayoutTriggerShell
                        trigger={trigger}
                        placeholder={placeholderProp}
                        renderItem={renderSelectedItem}
                        renderItems={renderSelectedItems}
                    />
                )}
                <ComboboxContent className={contentClassName}>
                    {variant === 'button' && (
                        <ComboboxLayoutSearchInput
                            placeholder={placeholderSearch}
                            showClear={showClear}
                            showTrigger={showTriggerResolved}
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
        </FieldLayout>
    )
}
