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
