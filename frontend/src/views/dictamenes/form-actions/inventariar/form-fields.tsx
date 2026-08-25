import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import React from "react";

export function AdquisicionIdField({
    items,
    layout,
    onValueChange,
    ...props
}: React.ComponentProps<typeof ComboboxFieldSimple>) {
    const [actualOption, setActualOption] = React.useState<Combobox>();

    const availableOptions = React.useMemo(() => {
        if (!actualOption) return items;
        return items.some(o => o.value === actualOption.value)
            ? items
            : [...items, actualOption];
    }, [items, actualOption]);

    return (
        <ComboboxFieldSimple
            layout={{
                label: "Caracteristicas solicitadas",
                ...layout
            }}
            value={actualOption}
            options={availableOptions}
            onValueChange={(option) => {
                setActualOption(option);
                onValueChange?.(option);
            }}
            {...props}
        />
    );
}
