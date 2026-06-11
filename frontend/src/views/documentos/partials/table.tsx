import { QueryDataTable, SearchInput, type QueryDataTableProps } from "@/components/custom/query-datatable";
import { columns, defaultColumns, initialState } from "./table-cols";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import type { Documento } from "@/types/documentos";
import type { CatalogoListResponse } from "@/types/generics";
import { MultiSelect } from "@/components/custom/multiselect";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";

export interface PrimitiveTableProps<TData extends Documento = Documento>
    extends Omit<QueryDataTableProps<TData>, 'columns' | 'queryKey' | 'url'> {
    columns?: ColumnDef<TData>[];
}

export function PrimitiveTable({
    columns = [],
    ...props
}: PrimitiveTableProps) {
    const columnDefinition = [
        ...columns,
        ...defaultColumns
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

    const { mutate, isPending: isPreviewing } = useFilePreviewWindowMutation();

    return (
        <PrimitiveTable
            columns={columns}
            filters={debouncedFilters}
            tableOptions={{
                initialState,
                meta: {
                    previewFile: (uuid: string, title?: string) => mutate({ uuid, title }),
                    isPreviewing
                }
            }}
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
                            tipos: v
                        }))}
                    />
                </>
            )}
        />
    );
}
