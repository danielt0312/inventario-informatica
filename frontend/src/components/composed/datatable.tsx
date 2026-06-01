import {
    DataTable as DataTablePrimitive,
    DataTablePagination,
    type DataTableProps as DataTablePropsPrimitive
} from "../ui/datatable";

export interface DataTableProps<TData> extends
    DataTablePropsPrimitive<TData>
{
    filterBar?: React.ReactNode
    actionBar?: React.ReactNode
}

export function DataTable<TData>({
    table,
    filterBar,
    actionBar,
    ...props
}: DataTableProps<TData>) {
    return (
        <div className="grid gap-y-4 w-full min-w-0">
            {(filterBar || actionBar) && (
                <div className="flex justify-between items-center">
                    <div className="flex-1 flex gap-2 flex-wrap min-w-0">
                        {filterBar && filterBar}
                    </div>
                    <div className="flex gap-2">
                        {actionBar && actionBar}
                    </div>
                </div>
            )}
            <div className="overflow-x-auto w-full">
                <DataTablePrimitive table={table} {...props} />
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}
