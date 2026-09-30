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
    ComboboxLayoutMultiple,
    ComboboxLayoutSharedUIProps,
    ComboboxLayoutSimpleProps,
} from "./combobox-layout.shared"
import { FieldLayout } from "./field-layout"

export type ComboboxLayoutSimpleComponentProps<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
> = Omit<
    ComboboxLayoutSimpleProps<Multiple, Item>,
    "items"
> & ComboboxLayoutSharedUIProps<Item> & {
    items: readonly Item[]
}

export function ComboboxLayoutSimple<
    Multiple extends ComboboxLayoutMultiple,
    Item extends ComboboxLayoutItem,
>(props: ComboboxLayoutSimpleComponentProps<Multiple, Item>) {
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
        value,
        required,
        disabled,
        layout,
        renderItem = (item: Item) => item.label,
        renderSelectedItem = (item: Item) => item.label,
        autoHighlight = true,
        renderChipsOnMultiple = true,
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
        <FieldLayout
            className={className}
            fieldLayout={{
                required,
                disabled,
                ...layout
            }}
        >
            <Combobox<Item, Multiple>
                {...rootProps}
                items={items}
                multiple={multiple}
                autoHighlight={autoHighlight}
                value={value ?? null}
                // required={required}
                disabled={disabled}
            >
                {showChips ? (
                    <ComboboxLayoutChips
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
                        {(item: Item) => (
                            <ComboboxItem key={item.value} value={item}>
                                {renderItem(item)}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </FieldLayout>
    )
}
