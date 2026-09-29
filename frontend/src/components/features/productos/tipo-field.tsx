import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ProductoCategoria, ProductoTipoWithCategoria } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import { productoTipoQueryOptions } from "./queries";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { ComboboxFieldGrouped, type ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

const dataToComboboxItems = (data: ProductoTipoWithCategoria[]) => {
    const grupos = new Map<number, { categoria: ProductoCategoria; tipo: ProductoTipoWithCategoria[] }>();

    for (const producto of data) {
        const { categoria } = producto;
        const grupo = grupos.get(categoria.id);

        if (grupo) {
            grupo.tipo.push(producto);
        } else {
            grupos.set(categoria.id, { categoria, tipo: [producto] });
        }
    }

    return toComboboxGroups([...grupos.values()], ({ categoria, tipo: productos }) => ({
        label: categoria.nombre,
        items: toComboboxItems(productos, (producto) => ({
            value: producto.id,
            label: producto.nombre,
        })),
    }));
}

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
