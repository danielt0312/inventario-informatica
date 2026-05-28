import type { ColumnDef } from "@tanstack/react-table";
import { useTable } from "./datatable";
import {
    usePaginatedQuery,
    type UsePaginatedQueryOptions
} from "@/hooks/use-paginated-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/lib/types";
import { DataTable, type DataTableProps } from "../composed/datatable";
import { usePagination } from "@/hooks/use-pagination";

export interface QueryDataTableProps<TData, TFilters extends object>
    extends Omit<DataTableProps<TData>, 'table' | 'query'>,
    Pick<UsePaginatedQueryOptions<TData, TFilters>, 'queryKey' | 'url' | 'filters' | 'paramsTransformer'> {
    columns: ColumnDef<TData>[];
    queryOptions?: Omit<UseQueryOptions<PaginatedResponse<TData>>, "queryKey" | "queryFn">;
}

export function QueryDataTable<TData, TFilters extends object>({
    queryKey,
    filters,
    columns,
    url,
    paramsTransformer,
    queryOptions,
    ...params
}: QueryDataTableProps<TData, TFilters>) {
    const [pagination, setPagination] = usePagination();

    const query = usePaginatedQuery<TData, TFilters>({
        queryKey,
        url,
        filters,
        pagination,
        paramsTransformer,
        ...queryOptions
    });

    const table = useTable({
        data: query.data?.data ?? [],
        columns,
        onPaginationChange: setPagination,
        rowCount: query.data?.total ?? 0,
        state: { pagination },
    });

    return (
        <DataTable
            table={table}
            query={query}
            {...params}
        />
    );
}
