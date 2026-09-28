import type { ProductoTipo, ProductoVarianteGenerica } from "@/types/productos";
import type { ComboboxFieldType } from "@/components/ui/combobox-field.shared";
import type { ProductoTipoFieldType } from "./tipo-field";
import { ComboboxFieldGrouped, type ComboboxFieldGroupedProps } from "@/components/ui/combobox-field-grouped";
import { useQuery } from "@tanstack/react-query";
import { toComboboxGroups, toComboboxItems, type InferComboboxGroupFromFn, type InferComboboxGroupItemFromFn } from "@/components/ui/combobox-layout.shared";
import { productoQueryOptions } from "./queries";

const dataToComboboxItems = (data: ProductoVarianteGenerica[]) => {
    const productosPorTipo = new Map<number, typeof data>();
    const tiposDisponibles: ProductoTipo[] = [];

    for (const generica of data) {
        const tipoId = generica.producto.tipo.id;
        let productos = productosPorTipo.get(tipoId);

        if (!productos) {
            productos = [];
            productosPorTipo.set(tipoId, []);
            tiposDisponibles.push(generica.producto.tipo);
        }

        productos.push(generica);
    }

    return toComboboxGroups(tiposDisponibles, (tipo) => ({
        label: tipo.nombre,
        items: toComboboxItems(
            productosPorTipo.get(tipo.id) ?? [],
            (producto) => ({
                value: producto.id,
                label: producto.descripcion
            })
        )
    }));
}

type FieldType<Multiple extends boolean | undefined = false> = ComboboxFieldType<Multiple, undefined>;

type FieldProps<Multiple extends boolean | undefined = false> = Omit<
    ComboboxFieldGroupedProps<
        InferComboboxGroupItemFromFn<typeof dataToComboboxItems>,
        InferComboboxGroupFromFn<typeof dataToComboboxItems>,
        Multiple
    >,
    'items'
> & {
    tipoId: ProductoTipoFieldType;
}

function Field<Multiple extends boolean | undefined = false>({
    layout,
    tipoId,
    disabled,
    ...props
}: FieldProps<Multiple>) {
    const { data: items = [] } = useQuery({
        ...productoQueryOptions(tipoId),
        enabled: !disabled,
        select: dataToComboboxItems
    });

    return (
        <ComboboxFieldGrouped
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
