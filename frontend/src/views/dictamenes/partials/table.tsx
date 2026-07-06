import { QueryDataTable, SearchInput } from "@/components/custom/query-datatable";
import { columns, type DictamenData } from "./table-cols";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { MultiSelect } from "@/components/custom/multiselect";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse, TCatalogo } from "@/types/generics";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Route as CreateRoute } from "@/routes/_auth/dictamenes/create";

export interface TableFilters {
    folio: string;
    estados: string[];
}

export function Table() {
    const { debouncedFilters, filters, setFilters } = useDebouncedFilters<TableFilters>({
        folio: '',
        estados: []
    });

    const { data: ESTADOS = [] } = useQuery({
        queryKey: ['dictamen_estados'],
        queryFn: () => api.get<TResponse<TCatalogo[]>>('api/dictamen_estados')
            .then(r => r.data.data)
    });

    return (
        <QueryDataTable<DictamenData, TableFilters>
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
        />
    );
}
