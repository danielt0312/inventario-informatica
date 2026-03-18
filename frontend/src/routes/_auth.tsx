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
                const res = await api.get<{user: User}>('api/user')
                return res.data.user
            }
        })

        console.log('USER FETCH', data);

        if (!data) {
            throw redirect({ to: RouteLogin.to })
        }

        return { user: data }
    }
})
