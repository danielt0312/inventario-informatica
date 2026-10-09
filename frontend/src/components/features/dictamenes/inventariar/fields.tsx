import { toComboboxItems } from "@/components/ui/combobox-layout.shared";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import { useComboboxFieldContext, useComboboxFieldValue, type ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { PorInventariarDictamenAdquisicion } from "@/types/dictamenes";
import React from "react";

function useAdquisicionComboboxItems(initialValues: PorInventariarDictamenAdquisicion[]) {
    const initialItems = React.useMemo(() =>
        initialValues
            .filter((adquisicion) => adquisicion.cantidad_restante > 0),
        [initialValues]);

    const [items, setItems] = React.useState(initialItems);

    const availableItems = React.useMemo(() => {
        const filtered = items.filter((o) => o.cantidad_restante > 0);
        return toComboboxItems(filtered, (item) => ({
            value: item.id,
            label: item.descripcion,
            ...item
        }))
    }, [items]);

    const allItems = React.useMemo(
        () => toComboboxItems(items, (item) => ({
            label: item.descripcion,
            value: item.id,
            ...item
        })),
        [items]
    );

    const removeItem = (id: number) => {
        setItems((prev) =>
            prev.map((o) =>
                o.id === id
                    ? { ...o, cantidad_restante: Math.max(0, o.cantidad_restante - 1) }
                    : o
            )
        );
    };

    const restoreItem = (id: number) => {
        setItems((prev) =>
            prev.map((o) =>
                o.id === id
                    ? { ...o, cantidad_restante: o.cantidad_restante + 1 }
                    : o
            )
        );
    };

    return { allItems, availableItems, removeItem, restoreItem };
}

type AdquisicionComboboxItem = ReturnType<typeof useAdquisicionComboboxItems>['allItems'][number];
type AdquisicionFieldValue = AdquisicionComboboxItem['value'];
type AdquisicionFieldEmptyValue = undefined;
type AdquisicionComboboxMultiple = false;
type AdquisicionFieldType = ComboboxFieldType<AdquisicionFieldEmptyValue, AdquisicionComboboxMultiple, AdquisicionFieldValue>

function AdquisicionField({
    items,
    availableItems,
    layout,
    ...props
}: ComboboxFieldSimpleProps<
    AdquisicionFieldEmptyValue,
    AdquisicionComboboxMultiple,
    AdquisicionComboboxItem
> & {
    availableItems: AdquisicionComboboxItem[];
}) {
    const field = useComboboxFieldContext<AdquisicionFieldEmptyValue, AdquisicionComboboxMultiple, AdquisicionFieldValue>();
    const derivedValue = useComboboxFieldValue(
        items,
        field.state.value,
        false,
        undefined
    );

    const derivedItems = React.useMemo(() => {
        if (!derivedValue) return availableItems;
        return availableItems.some(o => o.value === field.state.value)
            ? availableItems
            : [...availableItems, derivedValue];
    }, [availableItems, field.state.value]);

    return (
        <ComboboxFieldSimple<AdquisicionFieldEmptyValue, AdquisicionComboboxMultiple, AdquisicionComboboxItem>
            layout={{
                label: "Caracteristicas solicitadas",
                ...layout
            }}
            items={derivedItems}
            required
            {...props}
        />
    );
}

export {
    AdquisicionField as DictamenAdquisicionField,
    type AdquisicionFieldType as DictamenAdquisicionFieldType,
    useAdquisicionComboboxItems as useDictamenAdquisicionComboboxItems
}
