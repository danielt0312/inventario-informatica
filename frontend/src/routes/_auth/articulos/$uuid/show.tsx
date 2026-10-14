import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/articulos/$uuid/show')({
    component: RouteComponent,
    // loader: ({ context, params }) =>
    //     context.queryClient.ensureQueryData()
})

function RouteComponent() {
    return <div>Hello "/_auth/articulos/$uuid/show"!</div>
}
