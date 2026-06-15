import { checkAuth } from "@/lib/auth";
import { View } from "@/views/login";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/login")({
    component: View,
    beforeLoad: async ({ context }) => {
        const user = await checkAuth(context.queryClient);

        if (user) {
            throw redirect({ to: '/' });
        }
    }
});
