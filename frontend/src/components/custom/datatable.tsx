import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ComponentProps
} from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    type TableOptions,
    type PaginationState,
} from "@tanstack/react-table";
import {
    DataTable as DataTablePrimitive,
    type DataTableProps
} from "../composed/datatable";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export const usePagination = (initialState: Partial<PaginationState> = {}) => {
    return useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
        ...initialState,
    });
};

interface UseTableOptions<TData> extends Omit<TableOptions<TData>, "getCoreRowModel"> {
    rowCount?: number;
    getCoreRowModel?: TableOptions<TData>["getCoreRowModel"];
}

export const useTable = <TData,>({
    rowCount,
    getCoreRowModel: coreRowModelFn = getCoreRowModel(),
    ...params
}: UseTableOptions<TData>) =>
    useReactTable<TData>({
        getCoreRowModel: coreRowModelFn,
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        rowCount: rowCount ?? 0,
        ...params,
    });

export function useMinSpinning(isFetching: boolean, minDuration = 500) {
    const [isSpinning, setIsSpinning] = useState(false);
    const spinStartRef = useRef<number | null>(null);
    const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startSpin = useCallback(() => {
        if (!isSpinning) {
            spinStartRef.current = Date.now();
            setIsSpinning(true);
        }
    }, [isSpinning]);

    useEffect(() => {
        if (!isFetching && isSpinning && spinStartRef.current !== null) {
            const elapsed = Date.now() - spinStartRef.current;
            const remaining = minDuration - elapsed;

            if (remaining <= 0) {
                setIsSpinning(false);
                spinStartRef.current = null;
            } else {
                stopTimeoutRef.current = setTimeout(() => {
                    setIsSpinning(false);
                    spinStartRef.current = null;
                }, remaining);
            }
        }

        return () => {
            if (stopTimeoutRef.current) {
                clearTimeout(stopTimeoutRef.current);
                stopTimeoutRef.current = null;
            }
        };
    }, [isFetching, isSpinning, minDuration]);

    return { isSpinning, startSpin };
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
