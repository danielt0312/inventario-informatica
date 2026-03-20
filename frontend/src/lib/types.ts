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

export type {
    User,
    AuthRouteContext
}
