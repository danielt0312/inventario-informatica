import type { ComboboxOption } from "@/components/ui/creatable-combobox";
import { CreatableComboboxField } from "@/components/ui/creatable-combobox-field";
import { useFieldContext } from "@/components/ui/form-context";
import React from "react";

export function AdquisicionIdField({
    options,
    onValueChange,
    ...props
}: React.ComponentProps<typeof CreatableComboboxField>) {
    const [actualOption, setActualOption] = React.useState<ComboboxOption | undefined>();

    const availableOptions = React.useMemo(() => {
        if (!actualOption) return options;
        return options.some(o => o.value === actualOption.value)
            ? options
            : [...options, actualOption];
    }, [options, actualOption]);

    const field = useFieldContext();
    console.log(field.name, actualOption); // it reflects correctly

    return (
        <CreatableComboboxField
            label="Caracteristicas solicitadas"
            value={actualOption}
            options={availableOptions}
            widthClass="w-full"
            onValueChange={(option) => {
                onValueChange?.(option);
                setActualOption(option);
            }}
            {...props}
        />
    );
}
