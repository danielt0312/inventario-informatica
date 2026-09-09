import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { ComboboxFieldSimple } from "@/components/ui/combobox-field-simple";
import { discoTipoQueryOptions } from "./queries";

type TipoFieldType = ComboboxFieldType<false, undefined>;

function TipoField({
    layout,
    ...props
}: Omit<React.ComponentProps<typeof ComboboxFieldSimple>, 'items'>) {
    const { data: items = [] } = useQuery({
        ...discoTipoQueryOptions,
        select: toComboboxCatalogItems
    });

    return (
        <ComboboxFieldSimple
            items={items}
            layout={{
                label: "Tipo de Disco",
                ...layout
            }}
            {...props}
        />
    );
}

export {
    TipoField as DiscoTipoField,
    type TipoFieldType as DiscoTipoFieldType
}
