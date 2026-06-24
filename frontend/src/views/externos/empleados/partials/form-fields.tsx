import { CreatableComboboxField, type TOmitCreatableComboboxFieldsProps } from "@/components/composed/@tanstack/form/field-components";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";
import { toOptions } from "@/lib/utils";
import { type Field } from "../../../common/forms/schemas";

interface EmpleadoFieldProps extends TOmitCreatableComboboxFieldsProps<'disabled'> {
    adscripcion: Field;
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
