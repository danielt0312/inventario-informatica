import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/composed/datatable";
import { columns as defaultColumns, type Documento } from "./table.cols";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Filter } from "@/components/ui/datatable/action-bar";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "./form";

export function Table({
    cols = []
}: {
    cols?: ColumnDef<Documento>[]
}) {
    const { data = [] } = useQuery({
        queryKey: ['documentos'],
        queryFn: async () => await api.get<{ data: Documento[] }>('api/documentos')
            .then(response => response.data.data),
        staleTime: 60 * 1000
    });

    const columns = [...defaultColumns, ...cols];

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    return (
        <div className="grid gap-y-4">
            <div className="flex justify-between items-center">
                <div className="flex-1 flex gap-2 flex-wrap">
                    <Input
                        placeholder="Buscar archivo..."
                        value={(table.getColumn('archivo_nombre')?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn('archivo_nombre')?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm h-8"
                    />
                    <Filter label="Tipo de Documento">
                        <DropdownMenuCheckboxItem>
                            Adquisición de Bienes Informáticos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                            Factura
                        </DropdownMenuCheckboxItem>
                    </Filter>
                </div>
                <div>
                    <Form />
                </div>
            </div>
            <DataTable table={table} />
        </div>
    );
}
