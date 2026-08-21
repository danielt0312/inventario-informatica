import { QueryDataTable, SearchInput } from "@/components/ui/query-datatable";
import { columns, DictamenEstadoBadge } from "./table-cols";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "@/components/ui/multiselect";
import api from "@/lib/axios";
import type { TResponse, TCatalogo } from "@/types/generics";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Route as CreateRoute } from "@/routes/_auth/dictamenes/create";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import type { DictamenEstado } from "@/types/dictamenes";

interface TableFilters {
    folio: string;
    estados: string[];
}

export function Table() {
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
            columns={columns}
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
                <Link to={CreateRoute.to}>
                    <Button size="sm">
                        <PlusCircle /> Crear
                    </Button>
                </Link>
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
