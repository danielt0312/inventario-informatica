import AuthLayout from '@/components/AuthLayout'
import api from '@/lib/axios'
import { QueryClient, queryOptions } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Route as RouteLogin } from './_guest/login'

type User = {
    id: number
    email: string
    name: string
}

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
    beforeLoad: async ({ context }) => {
        const data = await context.queryClient.ensureQueryData({
            ...userQuery
        })

        if (!data) {
            throw redirect({ to: RouteLogin.to })
        }

        context.user = data.user
    }
})

const userQuery = queryOptions({
    queryKey: ['user'],
    queryFn: async () => await api.get<User>('api/user')
})

