import type { CreatableComboboxFieldProps } from "@/components/composed/@tanstack/form-field"
import {
    QueryClient,
    type UseQueryOptions
} from "@tanstack/react-query"

export type User = {
    id: number
    email: string
    name: string
}

export type AuthRouteContext = {
    user: User | null
    queryClient: QueryClient
}

export type TCatalogo = {
    id: number
    nombre: string
}

export type TResponse<T> = {
    data: T;
}

export type CatalogoResponse = TResponse<TCatalogo>;
export type CatalogoListResponse = TResponse<TCatalogo[]>;

export interface PaginatedResponse<T>
    extends TResponse<T[]> {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export type LaravelValidationErrors = Record<string, string[]>;

export type IdValue = number | null;

export type WithPrefix<T, P extends string> = {
    [K in keyof T as `${P}${string & K}`]: T[K];
};

export type OmitQueryOptions<
    TQueryFnData = unknown,
    TError extends Error = Error,
    TData = TQueryFnData
> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    'queryKey' | 'queryFn'
>;

export type OmitCreatableComboboxFieldsProps<
    TField extends number | string = string,
    TOmit extends keyof CreatableComboboxFieldProps<TField> = never
> = Omit<
    CreatableComboboxFieldProps<TField>,
    'options' | TOmit
>;
