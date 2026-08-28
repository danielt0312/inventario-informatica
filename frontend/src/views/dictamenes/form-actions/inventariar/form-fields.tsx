import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import { useComboboxFieldContext, useComboboxFieldValue } from "@/components/ui/combobox-field.shared";
import type { ComboboxLayoutItem } from "@/components/ui/combobox-layout.shared";
import React from "react";

export function AdquisicionIdField({
    items,
    availableItems,
    layout,
    ...props
}: React.ComponentProps<typeof ComboboxFieldSimple<ComboboxLayoutItem, false>> & {
    availableItems: ComboboxLayoutItem[];
}) {
    const field = useComboboxFieldContext();
    const derivedValue = useComboboxFieldValue(
        items,
        field.state.value,
        false,
        undefined
    );

    const availableOptions = React.useMemo(() => {
        if (!derivedValue) return availableItems;
        return availableItems.some(o => o.value === field.state.value)
            ? availableItems
            : [...availableItems, derivedValue];
    }, [availableItems, field.state.value]);

    return (
        <ComboboxFieldSimple
            layout={{
                label: "Caracteristicas solicitadas",
                ...layout
            }}
            items={availableOptions}
            required
            {...props}
        />
    );
}
