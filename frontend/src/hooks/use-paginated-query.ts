import api from "@/lib/axios";
import type { PaginatedResponse } from "@/types/generics";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

export interface UsePaginatedQueryOptions<TData, TFilters extends object = Record<string, unknown>>
    extends Omit<UseQueryOptions<PaginatedResponse<TData>>, "queryFn"> {
    url: string;
    filters?: TFilters;
    pagination: PaginationState;
    paramsTransformer?: (filters?: TFilters) => Record<string, unknown>;
}

export function usePaginatedQuery<TData, TFilters extends object>({
    queryKey,
    url,
    filters,
    pagination,
    paramsTransformer,
    ...params
}: UsePaginatedQueryOptions<TData, TFilters>): UseQueryResult<PaginatedResponse<TData>> {
    return useQuery({
        queryKey: [...queryKey, filters ?? {}, pagination],
        queryFn: () => {
            const transformedParams = paramsTransformer ? paramsTransformer(filters) : filters;

            return api.get<PaginatedResponse<TData>>(url, {
                params: {
                    ...transformedParams,
                    page: pagination.pageIndex + 1,
                    per_page: pagination.pageSize,
                },
            }).then(r => r.data)
        },
        ...params
    });
}
