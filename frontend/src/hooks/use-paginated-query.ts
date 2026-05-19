import api from "@/lib/axios";
import type { PaginatedResponse } from "@/lib/types";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

export interface UsePaginatedQueryOptions<TData, TFilters extends object>
  extends Omit<UseQueryOptions<PaginatedResponse<TData>>, "queryFn"> {
    url: string;
    filters: TFilters;
    pagination: PaginationState;
    paramsTransformer?: (filters: TFilters) => Record<string, unknown>;
}

export function usePaginatedQuery<TData, TFilters extends object>({
    queryKey,
    url,
    filters,
    pagination,
    staleTime = 60 * 1000,
    paramsTransformer,
    ...params
}: UsePaginatedQueryOptions<TData, TFilters>): UseQueryResult<PaginatedResponse<TData>> {
    return useQuery({
        queryKey: [...queryKey, filters, pagination],
        queryFn: () =>
            api.get<PaginatedResponse<TData>>(url, {
                params: {
                    ...(paramsTransformer ? paramsTransformer(filters) : filters),
                    page: pagination.pageIndex + 1,
                    per_page: pagination.pageSize,
                },
            }).then(r => r.data),
        staleTime,
        ...params
    });
}
