import Dictamen from "@/views/dictamen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_auth/dictamen')({
    component: Dictamen
})
