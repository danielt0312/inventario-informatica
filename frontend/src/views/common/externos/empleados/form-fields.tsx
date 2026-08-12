import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";
import type { AdscripcionFieldType } from "../adscripciones/form-fields";
import { toComboboxOptions } from "@/lib/utils";
import { CreatableComboboxField, type CreatableComboboxFieldType } from "@/components/ui/creatable-combobox-field";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export type EmpleadoFieldType = CreatableComboboxFieldType;
interface EmpleadoFieldProps extends Omit<React.ComponentProps<typeof CreatableComboboxField>, 'enabled' | 'options'> {
    adscripcion: AdscripcionFieldType;
}
export const EmpleadoField = ({
    adscripcion,
    label = "Empleado",
    ...props
}: EmpleadoFieldProps) => {
    const disabled = adscripcion === undefined;

    const { data: options = [] } = useQuery({
        queryKey: ['empleados', adscripcion],
        queryFn: () => api.get<TResponse<Empleado[]>>('api/empleados', {
            params: {
                filter: {
                    adscripciones: Number(adscripcion)
                }
            }
        }).then(r => r.data.data),
        select: toComboboxOptions,
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
