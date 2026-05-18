import { QueryClient } from "@tanstack/react-query"

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

export type Response<T> = {
    data: T;
}

export type CatalogoResponse = Response<TCatalogo>;
export type CatalogoListResponse = Response<TCatalogo[]>;

export interface PaginatedResponse<T>
  extends Response<T[]> {
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
