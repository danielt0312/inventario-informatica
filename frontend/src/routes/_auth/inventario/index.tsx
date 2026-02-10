import Inventario from '@/views/inventario'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/inventario/')({
  component: Inventario,
})
