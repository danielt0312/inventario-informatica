import DictamenCreate from '@/views/dictamen/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dictamen/create')({
  component: DictamenCreate,
})
