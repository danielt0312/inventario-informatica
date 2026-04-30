'use client';

import type { UseQueryResult } from "@tanstack/react-query";
import {
    DataTable as DataTablePrimitive,
    DataTablePagination,
    type DataTableProps as DataTablePropsPrimitive
} from "../ui/datatable";
import { Spinner } from "../ui/spinner";
import type { PaginatedResponse } from "@/lib/types";

interface DataTableStatus {
    query: UseQueryResult<unknown, Error>
}

function getContentStatus({ query }: DataTableStatus): React.ReactNode {
    const { isError, isPending, isFetching, data } = query;

    if (isFetching && isPending) {
        return <Spinner className="size-6 md:size-8" />;
    }

    if (isError) {
        return (
            <span className="text-destructive">
                Hubo un error al intentar consultar la información
            </span>
        );
    }

    const isEmpty =
        data == null ||
        (Array.isArray(data) ? data.length === 0
        : Array.isArray((data as PaginatedResponse<unknown>).data)
            ? (data as PaginatedResponse<unknown>).data.length === 0
            : false);

    return isEmpty
        ? (
            <span className="text-muted-foreground italic">
                No se encontró información.
            </span>
        )
        : undefined;
}

interface DataTableProps<TData, TQueryData = TData[]>
  extends DataTablePropsPrimitive<TData> {
    filterBar?: () => React.ReactNode
    actionBar?: () => React.ReactNode
    query?: UseQueryResult<TQueryData, Error>
}

export function DataTable<TData, TQueryData = TData[]>({
    table,
    filterBar,
    actionBar,
    query
}: DataTableProps<TData, TQueryData>) {
    const contentStatus = query ? getContentStatus({ query }) : undefined;

    return (
        <div className="grid gap-y-4 w-full min-w-0">
            {(filterBar || actionBar) && (
                <div className="flex justify-between items-center">
                    <div className="flex-1 flex gap-2 flex-wrap min-w-0">
                        {filterBar?.()}
                    </div>
                    {actionBar?.()}
                </div>
            )}
            <div className="overflow-x-auto w-full">
                <DataTablePrimitive table={table} contentStatus={contentStatus} />
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}
