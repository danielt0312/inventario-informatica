import { ComboboxLayoutSimple, toComboboxItems } from "@/components/ui/combobox-layout";
import { ComboboxLayoutGrouped, toComboboxGroups } from "@/components/ui/combobox-layout-grouped";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { ProductoCategoriaWithTipos } from "@/types/productos";
import { useQuery } from "@tanstack/react-query";

function View() {
    const { data = [] } = useQuery({
        queryKey: ['producto_categorias_tipos'],
        queryFn: () => api.get<TResponse<ProductoCategoriaWithTipos[]>>('api/producto_categorias', {
            params: {
                include: 'tipos'
            }
        }).then(r => r.data.data),
    });

    const options = toComboboxItems(data, (item) => ({
        label: item.nombre,
        value: item.id,
        ...item
    }))

    const groupedOptions = toComboboxGroups(data, (item) => ({
        items: item.tipos.map(t => ({ label: t.nombre, value: t.id })),
        label: item.nombre
    }))

    return (
        <>
            <ComboboxLayoutSimple
                items={options}
            />

            <ComboboxLayoutGrouped
                items={groupedOptions}
            />
        </>
    );
}

export {
    View as InventarioRevisionView
}
