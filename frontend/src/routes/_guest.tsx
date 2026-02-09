import GuestLayout from '@/components/GuestLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
})

