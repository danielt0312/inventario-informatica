'use client';

import {
    DataTable as DataTablePrimitive,
    DataTablePagination,
    type DataTableProps as DataTableProps
} from "../ui/datatable";

export function DataTable<TData>({
    table,
    actionBar
}: DataTableProps<TData> & {
    actionBar?: () => React.ReactNode
}) {
    return (
        <div className="grid gap-y-4">
            {actionBar?.()}
            <DataTablePrimitive table={table} />
            <DataTablePagination table={table} />
        </div>
    )
}

