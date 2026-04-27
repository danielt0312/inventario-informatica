import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/composed/datatable";
import { columns as defaultColumns, type Documento } from "./table.cols";
import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Form } from "./form";
import type { TCatalogo } from "@/lib/types";
import { useEffect, useState } from "react";
import { DataTableFilter, DataTableFilterItem } from "@/components/ui/datatable";
import { useDebounce } from "@/hooks/use-debounce";

export function Table({
    actionRow = []
}: {
    actionRow?: ColumnDef<Documento>[]
}) {
    const { data: DOCUMENTO_TIPOS = [] } = useQuery({
        queryKey: ['documento_tipos'],
        queryFn: async () => await api.get<{ data: TCatalogo[] }>('api/documento_tipos')
            .then(response => response.data.data),
        staleTime: Infinity
    });

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        if (DOCUMENTO_TIPOS.length > 0 && selectedIds.length === 0) {
            setSelectedIds(DOCUMENTO_TIPOS.map((c) => c.id));
        }
    }, [DOCUMENTO_TIPOS]);


    const [archivoNombre, setArchivoNombre] = useState('');
    const debouncedArchivoNombre = useDebounce(archivoNombre)

    const { data = [] } = useQuery({
        queryKey: ['documentos', debouncedArchivoNombre, selectedIds],
        queryFn: async () => await api.get<{ data: Documento[] }>('api/documentos', { params: {
            archivo: {
                nombre: debouncedArchivoNombre,
            }
        } })
            .then(response => response.data.data),
        staleTime: 60 * 1000
    });

    const columns = [...defaultColumns, ...actionRow];

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <DataTable
            table={table}
            actionBar={() => (
                <div className="flex justify-between items-center">
                    <div className="flex-1 flex gap-2 flex-wrap">
                        <Input
                            placeholder="Buscar archivo..."
                            value={archivoNombre}
                            onChange={(e) => setArchivoNombre(e.target.value)}
                            className="max-w-sm h-8"
                        />
                        <DataTableFilter label="Tipo de Documento">
                            {DOCUMENTO_TIPOS.map((data, index) => (
                                <DataTableFilterItem key={index}>
                                    {data.nombre}
                                </DataTableFilterItem>
                            ))}
                        </DataTableFilter>
                    </div>
                    <div>
                        <Form />
                    </div>
                </div>
            )}
        />
    );
}
