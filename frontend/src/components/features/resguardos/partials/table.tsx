import { Route as RouteCreate } from "@/routes/_auth/resguardos/crear";
import { QueryDataTable } from "@/components/ui/query-datatable";
import { ResguardoEstadoBadge, resguardoTableColumns } from "./table-cols";
import { RouterButton } from "@/components/ui/router-button";
import { CirclePlusIcon } from "lucide-react";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { ResguardoEstado } from "@/types/resguardos";
import { MultiSelect } from "@/components/ui/multiselect";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";

interface TableFilters {
    estado: number[];
}

function Table() {
    const { filters, setFilters, debouncedFilters } = useDebouncedFilters<TableFilters>({
        estado: [],
    });

    const { data: ESTADOS = [] } = useQuery({
        queryKey: ['producto_categorias'],
        queryFn: () => api.get<TResponse<ResguardoEstado[]>>('api/resguardo_estados')
            .then(r => r.data.data),
    });

    const { mutate, isPending: isPreviewing } = useFilePreviewWindowMutation();

    return (
        <QueryDataTable
            url='api/resguardos'
            queryKey={['resguardos']}
            columns={resguardoTableColumns}
            filter={debouncedFilters}
            filterBar={(
                <>
                    <MultiSelect
                        label="Estados"
                        options={ESTADOS}
                        selected={filters.estado.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            estado: v.map(Number),
                        }))}
                        onOptionRender={(option) => <ResguardoEstadoBadge estado={option} />}
                    />
                </>
            )}
            actionBar={(
                <RouterButton to={RouteCreate.to} size="sm" >
                    <CirclePlusIcon /> Crear o Modificar
                </RouterButton>
            )}
            tableOptions={{
                meta: {
                    previewFile: (uuid, title) => mutate({ uuid, title }),
                    isPreviewing
                }
            }}
        />
    );
}

export { Table as ResguardoTable }
