import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ProductoCategoria, ProductoTipoWithCategoria } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";
import { productoTipoQueryOptions } from "./queries";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { ComboboxFieldGrouped, type ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

const dataToComboboxItems = (data: ProductoTipoWithCategoria[]) => {
    const productoTiposPorCategoria = new Map<number, typeof data>();
    const categoriasDisponibles: ProductoCategoria[] = [];

    for (const generica of data) {
        const categoriaId = generica.categoria.id;
        let productos = productoTiposPorCategoria.get(categoriaId);

        if (!productos) {
            productos = [];
            productoTiposPorCategoria.set(categoriaId, []);
            categoriasDisponibles.push(generica.categoria);
        }

        productos.push(generica);
    }

    return toComboboxGroups(categoriasDisponibles, (categoria) => ({
        label: categoria.nombre,
        items: toComboboxItems(
            productoTiposPorCategoria.get(categoria.id) ?? [],
            (producto) => ({
                value: producto.id,
                label: producto.nombre
            })
        )
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
