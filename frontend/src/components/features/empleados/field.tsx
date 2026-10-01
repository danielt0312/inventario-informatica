import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import type { ComboboxLayoutItemValue, ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import type { AdscripcionFieldType } from "../adscripciones/field";
import { empleadosQueryOptions } from "./queries";

type FieldType<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Value, Empty, Multiple>;

type FieldProps<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    ComboboxFieldSimpleProps<
        Value,
        Empty,
        Multiple,
        InferComboboxItemFromFn<typeof toComboboxCatalogItems>
    >,
    'items' | 'enabled'
> & {
    adscripcionId?: AdscripcionFieldType;
};

function Field<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    adscripcionId,
    layout,
    disabled,
    ...props
}: FieldProps<Value, Empty, Multiple>) {
    const { data: items = [] } = useQuery({
        ...empleadosQueryOptions(adscripcionId),
        enabled: !disabled,
        select: toComboboxCatalogItems
    });

    return (
        <ComboboxFieldSimple
            items={items}
            disabled={disabled}
            layout={{
                label: "Resguardante",
                ...layout
            }}
            {...props}
        />
    );
}

export {
    Field as EmpleadoField,
    type FieldType as EmpleadoFieldType
}
