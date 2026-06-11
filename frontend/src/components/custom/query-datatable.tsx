import type { PaginatedResponse } from "@/types/generics";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef, type TableOptions } from "@tanstack/react-table";
import { DataTable, type DataTableProps } from "../composed/datatable";
import { usePaginatedQuery, type UsePaginatedQueryOptions } from "@/hooks/use-paginated-query";
import { usePagination } from "@/hooks/use-pagination";
import { useMinSpinning } from "@/hooks/use-min-spinning";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export interface DataTableStatus<TData = unknown, TError = Error> {
    query: UseQueryResult<PaginatedResponse<TData>, TError>
}

export function getContentStatus<TData, TError>({
    query
}: DataTableStatus<TData, TError>): React.ReactNode {
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

    const isEmpty = !!data && data.data.length === 0;

    return isEmpty
        ? (
            <span className="text-muted-foreground italic">
                No se encontró información.
            </span>
        )
        : undefined;
}

export interface UseTableOptions<TData> extends
    Omit<TableOptions<TData>, "getCoreRowModel"> {
    getCoreRowModel?: TableOptions<TData>["getCoreRowModel"];
}

export function useAppTable<TData>({
    rowCount,
    getCoreRowModel: coreRowModelFn = getCoreRowModel(),
    ...params
}: UseTableOptions<TData>) {
    return useReactTable<TData>({
        getCoreRowModel: coreRowModelFn,
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        rowCount: rowCount ?? 0,
        ...params,
    });
}

export interface QueryDataTableProps<TData, TFilters extends object = Record<string, unknown>> extends
    Omit<DataTableProps<TData>, 'table'>,
    Pick<UsePaginatedQueryOptions<TData, TFilters>, 'queryKey' | 'url' | 'filters' | 'paramsTransformer'> {
    columns: ColumnDef<TData>[];
    queryOptions?: Omit<UseQueryOptions<PaginatedResponse<TData>>, "queryKey" | "queryFn">;
    tableOptions?: Omit<UseTableOptions<TData>, 'data' | 'columns' >
}

export function QueryDataTable<TData, TFilters extends object>({
    queryKey,
    filters,
    columns,
    url,
    paramsTransformer,
    actionBar,
    queryOptions,
    tableOptions,
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

    const { isSpinning, startSpin } = useMinSpinning(query.isFetching ?? false);

    const contentStatus = getContentStatus({ query });

    const table = useAppTable<TData>({
        data: query.data?.data ?? [],
        columns,
        onPaginationChange: setPagination,
        rowCount: query.data?.meta.total ?? 0,
        state: { pagination },
        ...tableOptions
    });

    return (
        <DataTable
            table={table}
            actionBar={
                <>
                    {query && (
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={isSpinning}
                            onClick={() => {
                                startSpin();
                                query.refetch();
                            }}
                        >
                            <RefreshCcw className={isSpinning ? "animate-spin" : ""} />
                        </Button>
                    )}
                    {actionBar}
                </>
            }
            contentStatus={contentStatus}
            {...params}
        />
    );
}

export interface SearchInputProps extends
    Omit<React.ComponentProps<typeof Input>, 'placeholder'> {
    placeholder: NonNullable<React.ComponentProps<typeof Input>>['placeholder']
}

export function SearchInput({
    className,
    ...props
}: SearchInputProps) {
    return (
        <Input
            className={cn("max-w-sm h-8", className)}
            {...props}
        />
    )
}
