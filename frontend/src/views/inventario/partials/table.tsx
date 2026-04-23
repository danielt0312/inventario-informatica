import { DataTable } from "@/components/composed/datatable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns, type Inventario } from "./table.cols";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function Table() {
    const { data = [] } = useQuery({
        queryKey: ['articulos'],
        queryFn: async () => {
            const { data: axiosData } = await api.get<{ data: Inventario[] }>('api/articulos')
            return axiosData.data;
        }
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <DataTable table={table} />
    );
}
