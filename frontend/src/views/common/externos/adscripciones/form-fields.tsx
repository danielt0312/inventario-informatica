import { CreatableComboboxField } from "@/components/ui/creatable-combobox-field";
import api from "@/lib/axios";
import { toComboboxOptions } from "@/lib/utils";
import type { Adscripcion } from "@/types/externos";
import type { TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";

interface AdscripcionFieldProps extends Omit<React.ComponentProps<typeof CreatableComboboxField>, 'options'> {
}
export type AdscripcionFieldType = CreatableComboboxField;
export const AdscripcionField = ({
    label = "Área de Adscripción",
    ...props
}: AdscripcionFieldProps) => {
    const { data: options = [] } = useQuery({
        queryKey: ['adscripciones'],
        queryFn: () => api.get<TResponse<Adscripcion[]>>('api/adscripciones')
            .then(r => r.data.data),
        select: toComboboxOptions
    });

    return (
        <CreatableComboboxField
            options={options}
            label={label}
            {...props}
        />
    );
}
