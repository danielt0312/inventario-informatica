import { createFileRoute, redirect } from '@tanstack/react-router'

import { Route as RouteLogin } from './_guest/login'
import { Route as RouteInventario } from './_auth/inventario/index'

export const Route = createFileRoute('/')({
    loader: () => {
        if (! isUserAuth()) {
            throw redirect({
                to: RouteLogin.to
            })
        }

        throw redirect({
            to: RouteInventario.to
        })
    }
})

function isUserAuth() : boolean {
    return false;
}
