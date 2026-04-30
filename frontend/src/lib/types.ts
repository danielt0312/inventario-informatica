import { QueryClient } from "@tanstack/react-query"

type User = {
    id: number
    email: string
    name: string
}

type AuthRouteContext = {
    user: User | null
    queryClient: QueryClient
}

type ProductoCategoria = {
    id: number
    nombre: string
}

type ProductoTipo = {
    id: number
    nombre: string
    categoria_id: number
}

type ProductoMarca = {
    id: number
    nombre: string
}

type Producto = {
    id: number
    tipo_id: number
    marca_id: number
    nombre: string
}

export type TCatalogo = {
    id: number
    nombre: string
}

export const DocumentoTipo = {
  FACTURA: 1,
  OFICIO: 2,
  ADQUISICION: 3,
  RESGUARDO: 4,
  PRESTAMO: 5,
  DICTAMEN: 6
} as const;

export type DocumentoTipo = typeof DocumentoTipo[keyof typeof DocumentoTipo];

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  per_page: number
  current_page: number
  last_page: number
}

export type {
    User,
    AuthRouteContext,
    Producto,
    ProductoCategoria,
    ProductoTipo,
    ProductoMarca
}
