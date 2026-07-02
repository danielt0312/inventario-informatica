import { CreatableComboboxField } from "@/components/composed/@tanstack/form/creatable-combobox-field";
import api from "@/lib/axios";
import { toOptions } from "@/lib/utils";
import type { Adscripcion } from "@/types/externos";
import type { TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";

export type AdscripcionField = CreatableComboboxField;
export interface AdscripcionFieldProps extends Omit<React.ComponentProps<typeof CreatableComboboxField>, 'options'> {
}
export const AdscripcionField = ({
    label = "Área de Adscripción",
    ...props
}: AdscripcionFieldProps) => {
    const { data: options = [] } = useQuery({
        queryKey: ['adscripciones'],
        queryFn: () => api.get<TResponse<Adscripcion[]>>('api/adscripciones')
            .then(r => r.data.data),
        select: toOptions
    });

    return (
        <CreatableComboboxField
            options={options}
            label={label}
            {...props}
        />
    );
}
