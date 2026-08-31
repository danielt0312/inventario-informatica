import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";
import type { AdscripcionFieldType } from "../adscripciones/form-fields";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import React from "react";
import api from "@/lib/axios";

export type EmpleadoFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

export const EmpleadoField = ({
    adscripcionId,
    layout,
    disabled,
    ...props
}: Omit<React.ComponentProps<typeof ComboboxFieldSimple>, 'enabled' | 'items'> & {
    adscripcionId?: AdscripcionFieldType<false>;
}) => {
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
