import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import { useComboboxFieldContext, useComboboxFieldValue } from "@/components/ui/combobox-field.shared";
import type { ComboboxLayoutItem } from "@/components/ui/combobox-layout.shared";
import React from "react";

export function AdquisicionIdField({
    items,
    allItems,
    layout,
    ...props
}: React.ComponentProps<typeof ComboboxFieldSimple<ComboboxLayoutItem, false>> & {
    allItems: ComboboxLayoutItem[];
}) {
    const field = useComboboxFieldContext();
    const derivedValue = useComboboxFieldValue(
        allItems,
        field.state.value,
        false,
        undefined
    );

    const availableOptions = React.useMemo(() => {
        if (!derivedValue) return items;
        return items.some(o => o.value === field.state.value)
            ? items
            : [...items, derivedValue];
    }, [items, field.state.value]);

    return (
        <ComboboxFieldSimple
            layout={{
                label: "Caracteristicas solicitadas",
                ...layout
            }}
            items={availableOptions}
            {...props}
        />
    );
}
