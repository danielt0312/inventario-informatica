import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import { adscripcionesQueryOptions } from "./queries";
import type { ComboboxLayoutItemValue, ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";

type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false, Value extends ComboboxLayoutItemValue = number> = ComboboxFieldType<Empty, Multiple, Value>;

type FieldProps<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    ComboboxFieldSimpleProps<
        Empty,
        Multiple,
        InferComboboxItemFromFn<typeof toComboboxCatalogItems>
    >,
    'items'
>;

function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Empty, Multiple>) {
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
