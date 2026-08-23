"use client"

import * as React from "react"

import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxCollection,
    ComboboxSeparator,
    ComboboxEmpty,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxValue,
    ComboboxTrigger,
} from "@/components/ui/combobox"
import type {
    ComboboxLayoutGroup,
    ComboboxLayoutGroupedProps,
    ComboboxLayoutItem,
} from "./combobox-layout.shared"

// combobox-layout-grouped.tsx (reemplaza la sección del ComboboxList)
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox" // ajusta el import si tu wrapper no lo reexporta
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { InputGroupAddon } from "./input-group"
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react"

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
    const filteredGroups = ComboboxPrimitive.useFilteredItems<TGroup>()

    return (
        <ComboboxList>
            {filteredGroups.map((group, index) => (
                <React.Fragment key={getGroupKey(group, index)}>
                    <ComboboxGroup items={group.items}>
                        <ComboboxLabel>{renderGroupLabel(group)}</ComboboxLabel>
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
> = Omit<ComboboxLayoutGroupedProps<TItem, TGroup, Multiple>, "items"> & {
    items: readonly TGroup[]
    placeholder?: string
    emptyMessage?: React.ReactNode
    showClear?: boolean
    showTrigger?: boolean
    className?: string
    contentClassName?: string
    /** Default: índice del grupo dentro de `items`. */
    getGroupKey?: (group: TGroup, index: number) => React.Key
    /** Default: item.label */
    renderItem?: (item: TItem) => React.ReactNode
    /** Default: group.label */
    renderGroupLabel?: (group: TGroup) => React.ReactNode
    /** Si es true, la búsqueda también compara contra el label del grupo
   * al que pertenece cada item, además del propio item. Default: false. */
    searchByGroupLabel?: boolean
    /** Cómo convertir `group.label` a texto buscable, para cuando no es
     * un string plano (p. ej. JSX con ícono). Default: `String(group.label)`. */
    groupToStringLabel?: (group: TGroup) => string
    /** Cuando `multiple` es true, controla si se muestran los chips
   * seleccionados dentro del input (true) o si solo se
   * quiere la funcionalidad de selección múltiple sin chips visibles
   * (false, default) */
    renderChipsOnMultiple?: boolean
    /**
     * Placeholder utilizado para el input de búsqueda renderizado. Cuando `renderChips`
     * es pasado, se ignora.
     */
    placeholderSearch?: string
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
        placeholderSearch = 'Buscar...',
        ...rootProps
    } = props

    const showChips = multiple && renderChipsOnMultiple

    const placeholderProp = placeholder !== undefined
        ? placeholder
        : showChips
            ? 'Ingresa un valor'
            : 'Selecciona una opción'

    const collatorFilter = ComboboxPrimitive.useFilter()

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
        if (filterProp !== undefined) return filterProp // el consumidor manda si lo define explícito
        if (!searchByGroupLabel) return undefined // deja el filtrado default de Base UI intacto
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
                <ComboboxChips className={className}>
                    <ComboboxValue>
                        {(value: TItem[]) =>
                            value.map((item) => (
                                <ComboboxChip key={item.value}>
                                    {renderItem(item)}
                                </ComboboxChip>
                            ))
                        }
                    </ComboboxValue>
                    <ComboboxChipsInput placeholder={placeholderProp} />
                </ComboboxChips>
            ) : (
                <ComboboxTrigger render={
                    <Button variant="outline" className="justify-between font-normal">
                        <ComboboxValue>
                            {(selectedValue: TItem | null) => (selectedValue
                                ? renderItem(selectedValue)
                                : <span className="text-muted-foreground">{placeholderProp}</span>
                            )}
                        </ComboboxValue>
                        <ChevronsUpDownIcon className="text-muted-foreground" />
                    </Button>
                } />
            )}
            <ComboboxContent className={contentClassName}>
                {!showChips && (
                    <>
                        <ComboboxInput
                            placeholder={placeholderSearch}
                            showClear={showClear}
                            showTrigger={showTrigger}
                            className={cn(
                                "ring-0! border-0! bg-transparent!",
                                className
                            )}
                        >
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </ComboboxInput>
                        <ComboboxSeparator />
                    </>
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

/**
 * Transforma un arreglo de datos de dominio hacia TGroup — sin asumir
 * si el origen ya viene agrupado o si necesitas construir el
 * agrupamiento tú mismo dentro de `toGroup` (p. ej. filtrando o
 * derivando `items` a partir de otro dato disponible en el closure).
 *
 * El contrato de tipos es lo que aporta valor aquí: TypeScript exige
 * que `toGroup` devuelva exactamente `{ label, items }` (+ lo que
 * agregues a TGroup), señalando el error justo en el punto de la
 * transformación si algo no calza.
 */
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
