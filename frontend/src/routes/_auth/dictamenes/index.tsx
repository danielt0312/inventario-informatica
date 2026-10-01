import { DictamenTable } from "@/components/features/dictamenes/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_auth/dictamenes/')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
            </CardHeader>

            <CardContent>
                <DictamenTable />
            </CardContent>
        </Card>
    );
}
