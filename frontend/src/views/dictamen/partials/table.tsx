import { DataTable } from "@/components/composed/datatable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns, type Dictamen } from "./table.cols";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function Table() {
    const { data = [] } = useQuery({
        queryKey: ['articulos'],
        queryFn: async () => await api.get<{ data: Dictamen[] }>('api/dictamenes')
            .then(response => response.data.data)
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        // <DataTable table={table} />
        <></>
    );
}
