import type { TResponse, TCatalogo } from "@/types/generics";
import type { DictamenEstado } from "@/types/dictamenes";
import { QueryDataTable, SearchInput } from "@/components/ui/query-datatable";
import { dictamenDefaultTableColumns, DictamenEstadoBadge } from "./table-cols";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "@/components/ui/multiselect";
import { PlusCircle } from "lucide-react";
import { Route as CreateRoute } from "@/routes/_auth/dictamenes/crear";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { RouterButton } from "@/components/ui/router-button";
import api from "@/lib/axios";

interface TableFilters {
    folio: string;
    estados: string[];
}

function Table() {
    const { debouncedFilters, filters, setFilters } = useDebouncedFilters<TableFilters>({
        folio: '',
        estados: []
    });

    const { mutate, isPending: isPreviewing } = useFilePreviewWindowMutation();

    const { data: ESTADOS = [] } = useQuery({
        queryKey: ['dictamen_estados'],
        queryFn: () => api.get<TResponse<TCatalogo[]>>('api/dictamen_estados')
            .then(r => r.data.data),
    });

    return (
        <QueryDataTable
            columns={dictamenDefaultTableColumns}
            filter={debouncedFilters}
            url="api/dictamenes"
            queryKey={['dictamenes']}
            filterBar={(
                <>
                    <SearchInput
                        value={filters.folio}
                        placeholder="Folio de solicitud"
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            folio: e.target.value
                        }))}
                    />

                    <MultiSelect
                        label="Estado"
                        options={ESTADOS}
                        onOptionRender={(option) => (
                            <DictamenEstadoBadge estado={option as DictamenEstado} />
                        )}
                        selected={filters.estados}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            estados: v
                        }))}
                    />
                </>
            )}
            actionBar={(
                <RouterButton to={CreateRoute.to} size="sm">
                    <PlusCircle /> Crear
                </RouterButton>
            )}
            tableOptions={{
                meta: {
                    previewFile: (uuid, title) => mutate({ uuid, title }),
                    isPreviewing,
                }
            }}
        />
    );
}

export {
    Table as DictamenTable
}
