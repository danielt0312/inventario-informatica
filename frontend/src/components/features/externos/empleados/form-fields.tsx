import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";
import type { AdscripcionFieldType } from "../adscripciones/form-fields";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import React from "react";

export type EmpleadoFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

export const EmpleadoField = ({
    adscripcionId,
    layout,
    ...props
}: Omit<React.ComponentProps<typeof ComboboxFieldSimple>, 'enabled' | 'items'> & {
    adscripcionId: AdscripcionFieldType<false>;
}) => {
    const disabled = adscripcionId === undefined;

    const { data = [] } = useQuery({
        queryKey: ['empleados', adscripcionId],
        queryFn: () => api.get<TResponse<Empleado[]>>('api/empleados', {
            params: {
                filter: {
                    adscripciones: adscripcionId
                }
            }
        }).then(r => r.data.data),
        enabled: !disabled
    });

    const items = React.useMemo(() => toComboboxCatalogItems(data), [data]);

    return (
        <ComboboxFieldSimple
            items={items}
            disabled={disabled}
            layout={{
                label: "Resguardante",
                ...layout
            }}
            {...props}
        />
    );
}
