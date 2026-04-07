import AuthLayout from '@/components/AuthLayout'
import api from '@/lib/axios'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Route as RouteLogin } from './_guest/login'

import type { User } from '@/lib/types'

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
    beforeLoad: async ({ context }) => {
        try {
            const data = await context.queryClient.ensureQueryData({
                queryKey: ['user'],
                queryFn: async () => {
                    const { data: responseData } = await api.get<{ data: User }>('api/user');
                    return responseData.data
                },
                revalidateIfStale: true,
                staleTime: 0
            })

            if (!data) throw redirect({ to: RouteLogin.to })

            return { user: data }
        } catch (exception) {
            // todo verificar que tipo de exception fue capturado
            throw redirect({ to: RouteLogin.to })
        }
    }
})
