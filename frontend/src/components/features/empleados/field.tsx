import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ComboboxLayoutMultiple, InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import type { AreaFieldType } from "../areas/field";
import type { Empleado } from "@/types/externos";
import { toComboboxCatalogItems } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";
import { empleadosQueryOptions } from "./queries";

type ComboboxItem = InferComboboxItemFromFn<typeof toComboboxCatalogItems<Empleado>>;
type ComboboxItemValue = ComboboxItem['value'];
type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Empty, Multiple, ComboboxItemValue>;

type FieldProps<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    ComboboxFieldSimpleProps<
        Empty,
        Multiple,
        ComboboxItem
    >,
    'items' | 'enabled'
> & {
    areaId?: AreaFieldType;
};

function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    areaId,
    layout,
    disabled,
    ...props
}: FieldProps<Empty, Multiple>) {
    const { data: items = [] } = useQuery({
        ...empleadosQueryOptions(areaId),
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
