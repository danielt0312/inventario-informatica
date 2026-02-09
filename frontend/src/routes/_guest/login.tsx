import Login from "@/views/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/login")({
    component: Login
})
