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

export const DocumentoTipo = {
    FACTURA: 1,
    OFICIO: 2,
    ADQUISICION: 3,
    RESGUARDO: 4,
    PRESTAMO: 5,
    DICTAMEN: 6
} as const;
export type DocumentoTipo = typeof DocumentoTipo[keyof typeof DocumentoTipo];

export const ProductoCategoria = {
    COMPUTADORA: 1,
    DISPOSITIVO_ALMACENAMIENTO: 2,
    MEMORIA_ACCESO_ALEATORIO: 3,
} as const;
export type ProductoCategoria = typeof ProductoCategoria[keyof typeof ProductoCategoria];

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
