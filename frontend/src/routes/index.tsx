import { createFileRoute, redirect } from '@tanstack/react-router'
import { Route as LoginRoute } from './_guest/login';
import { checkAuth } from '@/lib/auth';

export const Route = createFileRoute('/')({
    beforeLoad: async ({ context }) => {
        const user = await checkAuth(context.queryClient);

        if (!user) {
            throw redirect({ to: LoginRoute.to });
        }

        // todo mapear ruta segun el rol del usuario
        throw redirect({ to: '/dictamenes' });
    }
});
