import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";
import { toOptions } from "@/lib/utils";
import type { AdscripcionField } from "../adscripciones/form-fields";

interface EmpleadoFieldProps extends Omit<React.ComponentProps<typeof CreatableComboboxField>, 'disabled' | 'options'> {
    adscripcion: AdscripcionField;
}

export type EmpleadoField = string;
export const EmpleadoField = ({
    adscripcion,
    label = "Empleado",
    ...props
}: EmpleadoFieldProps) => {
    const disabled = adscripcion === '';

    const { data: options = [] } = useQuery({
        queryKey: ['empleados', adscripcion],
        queryFn: () => api.get<TResponse<Empleado[]>>('api/empleados', {
            params: {
                filter: {
                    adscripciones: Number(adscripcion)
                }
            }
        }).then(r => r.data.data),
        select: toOptions,
        enabled: !disabled
    });

    return (
        <CreatableComboboxField
            options={options}
            label={label}
            disabled={disabled}
            {...props}
        />
    );
}
