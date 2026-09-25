import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ProductoCategoriaWithTipos } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import { productoTipoQueryOptions } from "./queries";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { ComboboxFieldGrouped, type ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";

type TipoFieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

const dataToComboboxItems = (items: ProductoCategoriaWithTipos[]) =>
    toComboboxGroups(items, (group) => ({
        items: toComboboxItems(group.tipos, (item) => ({
            label: item.nombre,
            value: item.id
        })),
        label: group.nombre
    }));

type TipoFieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldGroupedProps<
        InferComboboxGroupItemFromFn<typeof dataToComboboxItems>,
        InferComboboxGroupFromFn<typeof dataToComboboxItems>,
        Multiple
    >,
    'items'
>;

function TipoField<Multiple extends boolean | undefined = false>({
    layout,
    ...props
}: TipoFieldProps<Multiple>) {
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
    type TipoFieldType as ProductoTipoFieldType,
    TipoField as ProductoTipoField
}
