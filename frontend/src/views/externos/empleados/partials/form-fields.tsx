import { CreatableComboboxField, type TOmitCreatableComboboxFieldsProps } from "@/components/composed/@tanstack/form/field-components";
import { useQuery } from "@tanstack/react-query";
import { type Schema as AdscripcionSchema } from "../../adscripciones/partials/form-schema";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";
import { toOptions } from "@/lib/utils";

interface EmpleadoFieldProps extends TOmitCreatableComboboxFieldsProps<'disabled'> {
    adscripcion: AdscripcionSchema['id'];
}

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
