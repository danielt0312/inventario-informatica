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
    meta: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    }
}

export type LaravelValidationErrors = Record<string, string[]>;

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
    TOmit extends keyof CreatableComboboxFieldProps = never
> = Omit<
    CreatableComboboxFieldProps,
    'options' | TOmit
>;

export type ProductoMarca = TCatalogo;
export type ProductoCategoria = TCatalogo;
export type ProductoTipo = TCatalogo & {
    categoria: ProductoCategoria;
};
export type Producto = TCatalogo & {
    tipo: ProductoTipo;
    marca: ProductoMarca;
}

export type DocumentoTipo = TCatalogo;
export type Documento = {
    tipo: DocumentoTipo;
    archivo: {
        uuid: string;
        nombre: string | null;
    }
}

export type Oficio = {
    folio: string;
    documento: Documento;
}
