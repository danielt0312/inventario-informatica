import AuthLayout from '@/components/AuthLayout';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Route as LoginRoute } from './_guest/login';
import { checkAuth } from '@/lib/auth';

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
    beforeLoad: async ({ context }) => {
        const user = await checkAuth(context.queryClient);

        if (!user) {
            throw redirect({ to: LoginRoute.to });
        }

        return { user };
    }
});
