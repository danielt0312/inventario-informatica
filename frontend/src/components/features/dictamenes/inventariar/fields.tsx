import { toComboboxItems } from "@/components/ui/combobox-layout.shared";
import { strCompactJoin } from "@/lib/utils";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import { useComboboxFieldContext, useComboboxFieldValue, type ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { PorInventariarDictamenAdquisicion } from "@/types/dictamenes";
import React from "react";

function useAdquisicionesOptions(initialValues: PorInventariarDictamenAdquisicion[]) {
    const initialOptions = React.useMemo(() =>
        initialValues
            .filter((adquisicion) => adquisicion.cantidad_restante > 0)
            .map((adquisicion) => ({
                id: adquisicion.id,
                label: `${strCompactJoin(adquisicion.producto_variante.tipo.nombre, adquisicion.producto_variante.descripcion, adquisicion.caracteristicas_adicionales)} ― ${adquisicion.empleado?.nombre ?? 'Juan Pérez'}`,
                cantidad_restante: adquisicion.cantidad_restante,
            })),
        [initialValues]);

    const [options, setOptions] = React.useState(initialOptions);

    const availableOptions = React.useMemo(() => {
        const filtered = options.filter((o) => o.cantidad_restante > 0);
        return toComboboxItems(filtered, (item) => ({
            label: item.label,
            value: item.id
        }))
    }, [options]);

    const allOptions = React.useMemo(
        () => toComboboxItems(options, (item) => ({ label: item.label, value: item.id })),
        [options]
    );

    const removeOption = (id: number) => {
        setOptions((prev) =>
            prev.map((o) =>
                o.id === id
                    ? { ...o, cantidad_restante: Math.max(0, o.cantidad_restante - 1) }
                    : o
            )
        );
    };

    const restoreOption = (id: number) => {
        setOptions((prev) =>
            prev.map((o) =>
                o.id === id
                    ? { ...o, cantidad_restante: o.cantidad_restante + 1 }
                    : o
            )
        );
    };

    return { options: allOptions, availableOptions, removeOption, restoreOption };
}

type AdquisicionComboboxItem = ReturnType<typeof useAdquisicionesOptions>['options'][number];
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
    type AdquisicionFieldType as DictamenAdquisicionFieldType
}
