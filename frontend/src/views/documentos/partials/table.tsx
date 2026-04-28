'use client';

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/composed/datatable";
import { columns as defaultColumns, type Documento } from "./table.cols";
import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Form, queryOptTipos } from "./form";
import { useState } from "react";
import { DataTableFilter } from "@/components/ui/datatable";
import { useDebounce } from "@/hooks/use-debounce";

export function Table({
    actionRow = []
}: {
    actionRow?: ColumnDef<Documento>[]
}) {
    const { data: TIPOS = [] } = useQuery(queryOptTipos);

    const [tipos, setsetTipos] = useState<number[]>([]);
    const debouncedsetTipos = useDebounce(tipos, 500);

    const [archivoNombre, setArchivoNombre] = useState('');
    const debouncedArchivoNombre = useDebounce(archivoNombre);

    const query = useQuery({
        queryKey: ['documentos', debouncedArchivoNombre, debouncedsetTipos],
        queryFn: async () => await api.get<{ data: Documento[] }>('api/documentos', { params: {
            archivo_nombre: debouncedArchivoNombre,
            tipos: debouncedsetTipos.length  > 0 ? debouncedsetTipos : undefined
        } })
            .then(r => r.data.data),
        staleTime: 60 * 1000
    });

    const columns = [...defaultColumns, ...actionRow];

    const table = useReactTable({
        columns,
        data: query.data ?? [],
        getCoreRowModel: getCoreRowModel()
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
                        setSelectedFilters={setsetTipos}
                    />
                </>
            )}
            actionBar={() => <Form />}
        />
    );
}
