import { QueryDataTable, SearchInput, type QueryDataTableProps } from "@/components/custom/query-datatable";
import { columns, defaultColumns } from "./table-cols";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import type { CatalogoListResponse, Documento } from "@/lib/types";
import { MultiSelect } from "@/components/custom/multiselect";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";

export interface TablePrimitiveProps<TData extends Documento = Documento>
    extends Omit<QueryDataTableProps<TData>, 'columns' | 'queryKey' | 'url'> {
    columns?: ColumnDef<TData>[];
}

export function TablePrimitive({
    columns = [],
    ...props
}: TablePrimitiveProps) {
    const columnDefinition = [
        ...columns,
        ...defaultColumns,
    ];

    return (
        <QueryDataTable
            {...props}
            columns={columnDefinition}
            queryKey={['documentos']}
            url="api/documentos"
        />
    );
}

export type TableFilters = {
    archivo: string;
    tipos: string[];
}

export function Table() {
    const { debouncedFilters, filters, setFilters } = useDebouncedFilters<TableFilters>({
        archivo: '',
        tipos: []
    });

    const { data: TIPOS = [] } = useQuery({
        queryKey: ['documento_tipos'],
        queryFn: () => api.get<CatalogoListResponse>('api/documento_tipos')
            .then(r => r.data.data)
    });

    return (
        <TablePrimitive
            columns={columns}
            filters={debouncedFilters}
            filterBar={(
                <>
                    <SearchInput
                        value={filters.archivo}
                        placeholder="Nombre del documento..."
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            archivo: e.target.value
                        }))}
                    />

                    <MultiSelect
                        label="Tipo"
                        options={TIPOS}
                        selected={filters.tipos}
                        onChange={(v) => setFilters(prev => ({
                            ...prev,
                            categorias: v.map(Number)
                        }))}
                    />
                </>
            )}
        />
    );
}
