import AuthLayout from '@/components/AuthLayout'
import api from '@/lib/axios'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Route as RouteLogin } from './_guest/login'

import type { User } from '@/lib/types'

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
    beforeLoad: async ({ context }) => {
        const data = await context.queryClient.ensureQueryData({
            queryKey: ['user'],
            queryFn: async () => {
                const res = await api.get<{data: User}>('api/user')
                return res.data
            },
            revalidateIfStale: true,
            staleTime: 0
        })

        if (!data) throw redirect({ to: RouteLogin.to })

        return { user: data }
    }
})
