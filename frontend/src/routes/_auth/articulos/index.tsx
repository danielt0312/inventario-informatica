import { ArticuloIndexView } from '@/views/articulos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/articulos/')({
    component: ArticuloIndexView
})
