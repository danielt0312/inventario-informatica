import { QueryDataTable, SearchInput } from "@/components/custom/query-datatable";
import { useDebouncedFilters } from "@/hooks/use-debounced-filters";
import type { CatalogoListResponse } from "@/types/generics";
import { MultiSelect } from "@/components/custom/multiselect";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";
import { documentoGetDefaultColumns, documentoinitialTableState } from "./table-cols";

type TableFilters = {
    archivo: string;
    tipos: string[];
}

export function DocumentoTable() {
    const { debouncedFilters, filters, setFilters } = useDebouncedFilters<TableFilters>({
        archivo: '',
        tipos: []
    });

    const { mutate, isPending: isPreviewing } = useFilePreviewWindowMutation();

    const { data: TIPOS = [] } = useQuery({
        queryKey: ['documento_tipos'],
        queryFn: () => api.get<CatalogoListResponse>('api/documento_tipos')
            .then(r => r.data.data)
    });

    return (
        <QueryDataTable
            queryKey={['documentos']}
            url="api/documentos"
            columns={documentoGetDefaultColumns()}
            filter={debouncedFilters}
            filterBar={(
                <>
                    <SearchInput
                        value={filters.archivo}
                        placeholder="Nombre del archivo..."
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
            tableOptions={{
                initialState: documentoinitialTableState,
                meta: {
                    previewFile: (uuid, title) => mutate({ uuid, title }),
                    isPreviewing
                }
            }}
        />
    );
}
