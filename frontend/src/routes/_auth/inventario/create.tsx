import InventarioCreate from '@/views/inventario/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/inventario/create')({
  component: InventarioCreate,
})
