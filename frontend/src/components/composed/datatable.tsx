'use client';

import {
    DataTable as DataTablePrimitive,
    DataTablePagination,
    type DataTableProps
} from "../ui/datatable";

export function DataTable<TData>({
    table,
    children
}: DataTableProps<TData> & {
    children?: React.ReactNode
}) {
    return (
        <div className="grid gap-y-4">
            <DataTablePrimitive table={table} />
            <DataTablePagination table={table} />
        </div>
    )
}
