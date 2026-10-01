import {
    Combobox,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxInput,
} from "@/components/ui/combobox"
import {
    ComboboxLayoutChips,
    ComboboxLayoutTriggerShell,
    ComboboxLayoutSearchInput,
} from "./combobox-layout.parts"
import {
    resolveTriggerVariant,
    type ComboboxLayoutItem,
    type ComboboxLayoutMultiple,
    type ComboboxLayoutSharedUIProps,
    type ComboboxLayoutSimpleProps,
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
        showTrigger,
        triggerVariant,
        className,
        contentClassName,
        multiple,
        trigger,
        value,
        required,
        disabled,
        layout,
        emptyMessage = "No se encontraron resultados.",
        showClear = false,
        renderItem = (item: Item) => item.label,
        renderSelectedItem = (item: Item) => item.label,
        renderSelectedItems = (items: Item[]) => items.map((i) => i.label).join(", "),
        autoHighlight = true,
        renderChipsOnMultiple = true,
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
                {asChips ? (
                    <ComboboxLayoutChips
                        placeholder={placeholderProp}
                        renderItem={renderSelectedItem}
                    />
                ) : asInput ? (
                    <ComboboxInput
                        placeholder={placeholderProp}
                        showClear={showClear}
                        showTrigger={showTrigger}
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
