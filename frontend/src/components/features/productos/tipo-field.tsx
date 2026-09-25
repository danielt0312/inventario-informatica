import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ProductoCategoriaWithTipos } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import { productoTipoQueryOptions } from "./queries";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { ComboboxFieldGrouped, type ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

const dataToComboboxItems = (data: ProductoCategoriaWithTipos[]) =>
    toComboboxGroups(data, (group) => ({
        items: toComboboxItems(group.tipos, (item) => ({
            label: item.nombre,
            value: item.id
        })),
        label: group.nombre
    }));

type FieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldGroupedProps<
        InferComboboxGroupItemFromFn<typeof dataToComboboxItems>,
        InferComboboxGroupFromFn<typeof dataToComboboxItems>,
        Multiple
    >,
    'items'
>;

function Field<Multiple extends boolean | undefined = false>({
    layout,
    ...props
}: FieldProps<Multiple>) {
    const { data: items = [] } = useQuery({
        ...productoTipoQueryOptions,
        select: dataToComboboxItems
    });

    return (
        <ComboboxFieldGrouped
            items={items}
            layout={{
                label: "Tipo de Producto",
                ...layout
            }}
            {...props}
        />
    );
}

export {
    type FieldType as ProductoTipoFieldType,
    Field as ProductoTipoField
}
