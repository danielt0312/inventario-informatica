import { checkAuth } from "@/lib/auth";
import { LoginView } from "@/components/features/login";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/login")({
    component: LoginView,
    beforeLoad: async ({ context }) => {
        const user = await checkAuth(context.queryClient);

        if (user) {
            throw redirect({ to: '/' });
        }
    }
});
