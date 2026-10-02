import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import { toComboboxCatalogItems } from "@/lib/utils";
import { computadoraTipoQueryOptions } from "./queries";
import { useQuery } from "@tanstack/react-query";

type ComboboxItem = InferComboboxItemFromFn<typeof toComboboxCatalogItems>;
type FieldValue = ComboboxItem['value'];
type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Empty, Multiple, FieldValue>

type FieldProps<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    ComboboxFieldSimpleProps<
        Empty,
        Multiple,
        ComboboxItem
    >,
    'items'
>

function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Empty, Multiple>) {
    const { data: items = [] } = useQuery({
        ...computadoraTipoQueryOptions,
        select: toComboboxCatalogItems
    });

    return (
        <ComboboxFieldSimple
            items={items}
            layout={{ label: "Tipo", ...layout }}
            {...props}
        />
    );
}

export {
    Field as ComputadoraTipoField,
    type FieldType as ComputadoraTipoFieldType
}
