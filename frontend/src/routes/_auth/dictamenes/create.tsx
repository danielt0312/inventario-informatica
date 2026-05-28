import { Create } from '@/views/dictamenes/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dictamenes/create')({
    component: Create
})
