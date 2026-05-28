import Dictamen from "@/views/dictamenes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_auth/dictamenes/')({
    component: Dictamen
})
