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

type Producto = {
    id: number
    producto_tipo_id: number
    nombre: string
}

type ProductoTipo = {
    id: number
    nombre: string
}

type ProductoModelo = {
    id: number
    producto_id: number
    producto_marca_id: number
    nombre: string
}

type ProductoMarca = {
    id: number
    nombre: string
}

export type {
    User,
    AuthRouteContext,
    Producto,
    ProductoTipo,
    ProductoModelo,
    ProductoMarca
}
