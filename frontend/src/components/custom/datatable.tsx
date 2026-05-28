import {
    type ComponentProps
} from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    type TableOptions,
} from "@tanstack/react-table";
import {
    DataTable as DataTablePrimitive,
    type DataTableProps
} from "../composed/datatable";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useMinSpinning } from "@/hooks/use-min-spinning";

interface UseTableOptions<TData> extends Omit<TableOptions<TData>, "getCoreRowModel"> {
    rowCount?: number;
    getCoreRowModel?: TableOptions<TData>["getCoreRowModel"];
}

export function useTable<TData>({
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

export const DataTable = <TData, TQueryData = TData[]>({
    actionBar,
    query,
    ...props
}: DataTableProps<TData, TQueryData>) => {
    const { isSpinning, startSpin } = useMinSpinning(query?.isFetching ?? false);

    return (
        <DataTablePrimitive
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
            query={query}
            {...props}
        />
    );
};

export interface SearchInputProps
    extends Omit<ComponentProps<typeof Input>, 'placeholder'> {
    placeholder: NonNullable<ComponentProps<typeof Input>>['placeholder']
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
