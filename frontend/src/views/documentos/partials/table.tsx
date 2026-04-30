'use client';

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/composed/datatable";
import { columns as defaultColumns, type Documento } from "./table.cols";
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Form, queryOptTipos } from "./form";
import { useState } from "react";
import { DataTableFilter } from "@/components/ui/datatable";
import { useDebounce } from "@/hooks/use-debounce";
import type { PaginatedResponse } from "@/lib/types";

export function Table({
    actionRow = [],
    ...props
}: {
    actionRow?: ColumnDef<Documento>[]
}) {
    const { data: TIPOS = [] } = useQuery(queryOptTipos);

    const [tipos, setTipos] = useState<number[]>([]);
    const debouncedTipos = useDebounce(tipos, 500);

    const [archivoNombre, setArchivoNombre] = useState('');
    const debouncedArchivoNombre = useDebounce(archivoNombre);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });

    const query = useQuery({
        queryKey: ['documentos', debouncedArchivoNombre, debouncedTipos, pagination],
        queryFn: () => api.get<PaginatedResponse<Documento>>('api/documentos', {
            params: {
                archivo_nombre: debouncedArchivoNombre || undefined,
                tipos: debouncedTipos.length  > 0 ? debouncedTipos : undefined,
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize
            }
        }).then(r => r.data),
        staleTime: 60 * 1000
    });

    const columns = [...defaultColumns, ...actionRow];

    const table = useReactTable({
        columns,
        data: query.data?.data ?? [],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        manualPagination: true,
        rowCount: query.data?.total ?? 0,
        state: { pagination }
    });

    return (
        <DataTable
            table={table}
            query={query}
            filterBar={() => (
                <>
                    <Input
                        placeholder="Buscar archivo..."
                        value={archivoNombre}
                        onChange={(e) => setArchivoNombre(e.target.value)}
                        className="max-w-sm h-8"
                    />
                    <DataTableFilter
                        label="Tipo de Documento"
                        filters={TIPOS}
                        selectedFilters={tipos}
                        setSelectedFilters={setTipos}
                    />
                </>
            )}
            actionBar={() => <Form />}
            {...props}
        />
    );
}
