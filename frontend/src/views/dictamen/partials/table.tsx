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

interface TableFilters {
    estados: number[];
}

export const Table = () => {
    const { debouncedFilters, filters, setFilters } = useDebouncedFilters<TableFilters>({
        estados: [],
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
                    <MultiSelect
                        label="Estado"
                        options={ESTADOS}
                        selected={filters.estados.map(String)}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            categorias: v.map(Number),
                            tipos: [],
                            marcas: [],
                            productos: []
                        }))}
                    />
                </>
            )}
            actionBar={(
                <>
                    <Link to={CreateRoute.to}>
                        <Button
                            size="sm"
                        >
                            <PlusCircle /> Crear
                        </Button>
                    </Link>

                </>
            )}
        />
    );
}
