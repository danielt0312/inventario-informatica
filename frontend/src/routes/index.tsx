import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    loader: () => {
        if (! isUserAuth()) {
            throw redirect({
                to: '/login'
            })
        }

        throw redirect({
            to: '/dictamen'
        })
    }
})

function isUserAuth() : boolean {
    return false;
}

