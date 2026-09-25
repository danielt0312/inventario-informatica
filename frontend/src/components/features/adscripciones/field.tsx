import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import { adscripcionesQueryOptions } from "./queries";

type FieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldSimpleProps<
        ReturnType<typeof toComboboxCatalogItems>[number],
        Multiple
    >,
    'items'
>;

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

function Field<Multiple extends boolean | undefined = false>({
    layout,
    ...props
}: FieldProps<Multiple>) {
    const { data: items = [] } = useQuery({
        ...adscripcionesQueryOptions,
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

export {
    Field as AdscripcionField,
    type FieldType as AdscripcionFieldType
}
