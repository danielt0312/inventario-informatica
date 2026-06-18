import type { UseQueryOptions } from "@tanstack/react-query";

export type TCatalogo = {
    id: number
    nombre: string
}

export type TResponse<T> = {
    data: T
}

export type CatalogoResponse = TResponse<TCatalogo>
export type CatalogoListResponse = TResponse<TCatalogo[]>

export interface PaginatedResponse<T>
    extends TResponse<T[]> {
    meta: {
        total: number
        per_page: number
        current_page: number
        last_page: number
    }
}
export type LaravelValidationErrors = Record<string, string[]>

export type WithPrefix<T, P extends string> = {
    [K in keyof T as `${P}${string & K}`]: T[K]
}

export type OmitQueryOptions<
    TQueryFnData = unknown,
    TError extends Error = Error,
    TData = TQueryFnData
> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    'queryKey' | 'queryFn'
>;
