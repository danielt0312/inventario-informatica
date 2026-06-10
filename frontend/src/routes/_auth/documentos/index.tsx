import { View } from '@/views/documentos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/documentos/')({
    component: View,
})

