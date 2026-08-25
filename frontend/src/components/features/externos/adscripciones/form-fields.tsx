import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { Adscripcion } from "@/types/externos";
import type { TResponse } from "@/types/generics";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import api from "@/lib/axios";

interface AdscripcionFieldProps extends Omit<React.ComponentProps<typeof ComboboxFieldSimple>, 'items'> {
}
export type AdscripcionFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;
export const AdscripcionField = ({
    layout,
    ...props
}: AdscripcionFieldProps) => {
    const { data: items = [] } = useQuery({
        queryKey: ['adscripciones'],
        queryFn: () => api.get<TResponse<Adscripcion[]>>('api/adscripciones')
            .then(r => r.data.data),
        select: toComboboxCatalogItems
    });

    return (
        <ComboboxFieldSimple
            items={items}
            layout={{
                label: "Área de Adscripción",
                ...layout
            }}
            {...props}
        />
    );
}
