import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import { adscripcionesQueryOptions } from "./queries";
import type { ComboboxLayoutItemValue, ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";

type FieldType<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Value, Empty, Multiple>;

type FieldProps<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    ComboboxFieldSimpleProps<
        Value,
        Empty,
        Multiple,
        InferComboboxItemFromFn<typeof toComboboxCatalogItems>
    >,
    'items'
>;

function Field<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Value, Empty, Multiple>) {
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
