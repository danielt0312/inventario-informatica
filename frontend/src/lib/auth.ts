import { QueryClient } from "@tanstack/react-query";

export type User = {
    id: number
    email: string
    name: string
}

export type AuthRouteContext = {
    user: User | null
    queryClient: QueryClient
}
