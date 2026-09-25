"use client"

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
    ComboboxLayoutSharedUIProps,
    ComboboxLayoutSimpleProps,
} from "./combobox-layout.shared"

export type ComboboxLayoutSimpleComponentProps<
    TItem extends ComboboxLayoutItem,
    Multiple extends boolean | undefined = false,
> = Omit<ComboboxLayoutSimpleProps<TItem, Multiple>, "items"> &
    ComboboxLayoutSharedUIProps<TItem> & {
        items: readonly TItem[]
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
        renderSelectedItem = (item: TItem) => item.label,
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
                    renderItem={renderSelectedItem}
                />
            ) : (
                <ComboboxLayoutTriggerShell
                    trigger={trigger}
                    placeholder={placeholderProp}
                    renderItem={renderSelectedItem}
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
