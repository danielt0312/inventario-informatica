import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import { useQuery } from "@tanstack/react-query";
import { toComboboxItems, type ComboboxLayoutMultiple, type InferComboboxItemFromFn } from "@/components/ui/combobox-layout.shared";
import { productoQueryOptions } from "./queries";
import type { ProductoTipoGenericos } from "@/lib/constants";
import { ComboboxFieldSimple, type ComboboxFieldSimpleProps } from "@/components/ui/combobox-field-simple";

type ComboboxItem = InferComboboxItemFromFn<typeof toComboboxItems>;
type FieldValue = ComboboxItem['value'];
type FieldType<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Empty, Multiple, FieldValue>;

type FieldProps<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    ComboboxFieldSimpleProps<
        Empty,
        Multiple,
        ComboboxItem
    >,
    'items'
> & {
    tipoId?: ProductoTipoGenericos | undefined;
}

function Field<Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    disabled,
    tipoId,
    ...props
}: FieldProps<Empty, Multiple>) {
    const { data: items = [] } = useQuery({
        ...productoQueryOptions(tipoId),
        enabled: !disabled,
        select: (data) => toComboboxItems(data, (item) => ({
            label: item.descripcion,
            value: item.id
        }))
    });

    return (
        <ComboboxFieldSimple
            items={items}
            layout={{
                label: "Descripción",
                ...layout
            }}
            disabled={disabled}
            {...props}
        />
    );
}

export {
    Field as ProductoVarianteGenericaField,
    type FieldType as ProductoVarianteGenericaFieldType,
}
