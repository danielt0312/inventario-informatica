import { createFileRoute, redirect } from '@tanstack/react-router'

import { Route as RouteLogin } from './_guest/login'
import { Route as RouteDictamen } from './_auth/dictamen/index'

export const Route = createFileRoute('/')({
    loader: () => {
        if (! isUserAuth()) {
            throw redirect({
                to: RouteLogin.to
            })
        }

        throw redirect({
            to: RouteDictamen.to
        })
    }
})

function isUserAuth() : boolean {
    return true;
}

