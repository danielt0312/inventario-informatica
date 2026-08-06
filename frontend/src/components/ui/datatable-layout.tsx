import {
    DataTable,
    DataTablePagination,
    type DataTableProps
} from "./datatable";

export interface DataTableLayoutProps<TData> extends DataTableProps<TData> {
    filterBar?: React.ReactNode
    actionBar?: React.ReactNode
}

export function DataTableLayout<TData>({
    table,
    filterBar,
    actionBar,
    ...props
}: DataTableLayoutProps<TData>) {
    return (
        <div className="grid gap-y-4 w-full min-w-0">
            {(filterBar || actionBar) && (
                <div className="flex justify-between items-center">
                    <div className="flex-1 flex gap-2 flex-wrap min-w-0">
                        {filterBar}
                    </div>
                    <div className="flex gap-2">
                        {actionBar}
                    </div>
                </div>
            )}
            <div className="overflow-x-auto w-full">
                <DataTable table={table} {...props} />
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}
