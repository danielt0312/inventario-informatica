import { QueryDataTable } from "@/components/custom/query-datatable";
import { columns, type Dictamen } from "./table.cols";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import { MultiSelect } from "@/components/custom/multiselect";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { TResponse, TCatalogo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Route as CreateRoute } from "@/routes/_auth/dictamen/create";
import { SearchInput } from "@/components/custom/datatable";

interface TableFilters {
    estados: number[];
    folio: string;
}

export const Table = () => {
    const { debouncedFilters, filters, setFilters } = useDebouncedFilters<TableFilters>({
        estados: [],
        folio: ''
    });

    const { data: ESTADOS = [] } = useQuery({
        queryKey: ['dictamen_estados'],
        queryFn: () => api.get<TResponse<TCatalogo[]>>('api/dictamen_estados')
            .then(r => r.data.data)
    });

    return (
        <QueryDataTable<Dictamen, TableFilters>
            columns={columns}
            filters={debouncedFilters}
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
                        selected={filters.estados.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            categorias: v.map(Number)
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
