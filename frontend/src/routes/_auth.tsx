import AuthLayout from '@/components/AuthLayout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: AuthLayout
})
