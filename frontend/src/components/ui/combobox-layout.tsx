// combobox-layout-simple.tsx
"use client"

import * as React from "react"

import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxValue,
    ComboboxTrigger,
    ComboboxSeparator,
} from "@/components/ui/combobox"
import type {
    ComboboxLayoutItem,
    ComboboxLayoutSimpleProps,
} from "./combobox-layout.shared"
import { Button } from "./button"
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react"
import { InputGroupAddon } from "./input-group"
import { cn } from "@/lib/utils"

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
    /** Default: item.label */
    renderItem?: (item: TItem) => React.ReactNode
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
        renderItem = (item: TItem) => item.label,
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

    return (
        <Combobox<TItem, Multiple>
            items={items}
            multiple={multiple}
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

/**
 * Transforma un arreglo plano de datos de dominio hacia TItem.
 *
 * A diferencia de los helpers de grupo, aquí no hay bucketing ni
 * transformación anidada — es, honestamente, un wrapper delgado sobre
 * `.map()`. Lo agrego por simetría de API con `toComboboxGroups` /
 * `mapComboboxGroups` (incluyendo el mismo estilo de options-object en
 * vez de un segundo argumento posicional), no porque resuelva algo que
 * `.map()` no resuelva ya.
 */
export function toComboboxItems<TSource, TItem extends ComboboxLayoutItem>(
    source: readonly TSource[],
    toItem: (source: TSource, index: number) => TItem
): TItem[] {
    return source.map(toItem)
}
