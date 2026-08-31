import { ResguardoTable } from '@/components/features/resguardos/partials/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/resguardos/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Resguardos
                </CardTitle>
            </CardHeader>

            <CardContent>
                <ResguardoTable />
            </CardContent>
        </Card>
    );
}
