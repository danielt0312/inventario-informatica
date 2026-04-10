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

export type {
    User,
    AuthRouteContext,
    Producto,
    ProductoCategoria,
    ProductoTipo,
    ProductoMarca
}
