import type { ComboboxFieldEmptyType, ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ProductoCategoria, ProductoTipoWithCategoria } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import { productoTipoQueryOptions } from "./queries";
import { toComboboxGroups, toComboboxItems, type ComboboxLayoutItemValue, type ComboboxLayoutMultiple, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { ComboboxFieldGrouped, type ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";

type FieldType<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = ComboboxFieldType<Value, Empty, Multiple>;

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

type FieldProps<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false> = Omit<
    ComboboxFieldGroupedProps<
        Value,
        Empty,
        Multiple,
        InferComboboxGroupItemFromFn<typeof dataToComboboxItems>,
        InferComboboxGroupFromFn<typeof dataToComboboxItems>
    >,
    'items'
>;

function Field<Value extends ComboboxLayoutItemValue = number, Empty extends ComboboxFieldEmptyType = undefined, Multiple extends ComboboxLayoutMultiple = false>({
    layout,
    ...props
}: FieldProps<Value, Empty, Multiple>) {
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
