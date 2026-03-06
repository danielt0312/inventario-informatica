import { createFileRoute, redirect } from '@tanstack/react-router'

import { Route as RouteLogin } from './_guest/login'

export const Route = createFileRoute('/')({
    loader: () => {
        throw redirect({to: RouteLogin.to })
    }
})
