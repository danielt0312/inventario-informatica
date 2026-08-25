import { ComboboxLayoutSimple, toComboboxItems } from "@/components/ui/combobox-layout-simple";
import { ComboboxLayoutGrouped, toComboboxGroups } from "@/components/ui/combobox-layout-grouped";
import { CreatableComboboxGrouped } from "@/components/ui/creatable-combobox-grouped";
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
        idk: 'idk',
        ...item
    }))

    const groupedOptions = toComboboxGroups(data, (item) => ({
        items: item.tipos.map(t => ({ label: t.nombre, value: t.id, idk: 'idkValue' })),
        label: item.nombre
    }))

    return (
        <>
            <ComboboxLayoutSimple
                items={options}
                onValueChange={(v) => {
                    v?.idk
                }}
            />

            <ComboboxLayoutGrouped
                items={groupedOptions}
                onValueChange={(v) => console.log(v)}
            />

            <CreatableComboboxGrouped
                items={groupedOptions}
                onCreate={(q) => console.log(q)}
                onValueChange={(v) => console.log((v?.idk))
                }
            />
        </>
    );
}

export {
    View as InventarioRevisionView
}
