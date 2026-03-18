import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { routeTree } from './routeTree.gen'
import '@/index.css'
import type { User } from './lib/types'

const queryClient = new QueryClient()
const router = createRouter({
    routeTree,
    context: {
        user: null as User | null,
        queryClient: queryClient
    }
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

setupRouterSsrQueryIntegration({ router, queryClient })

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>,
    )
}
