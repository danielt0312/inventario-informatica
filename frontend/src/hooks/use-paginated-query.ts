import api from "@/lib/axios";
import { spatieFilterTransformer } from "@/lib/utils";
import type { PaginatedResponse } from "@/types/generics";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

export interface UsePaginatedQueryOptions<TData, TFilters extends object = Record<string, unknown>>
    extends Omit<UseQueryOptions<PaginatedResponse<TData>>, 'queryFn'> {
    url: string;
    filter?: TFilters;
    pagination: PaginationState;
    filterTransformer?: (filters?: TFilters) => Record<string, unknown>;
}

export function usePaginatedQuery<TData, TFilters extends object = Record<string, unknown>>({
    queryKey,
    url,
    filter,
    pagination,
    filterTransformer = spatieFilterTransformer,
    ...params
}: UsePaginatedQueryOptions<TData, TFilters>): UseQueryResult<PaginatedResponse<TData>> {
    return useQuery({
        queryKey: [...queryKey, filter ?? {}, pagination],
        queryFn: () => api.get<PaginatedResponse<TData>>(url, {
            params: {
                ...filterTransformer(filter),
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            },
        }).then(r => r.data),
        ...params
    });
}
