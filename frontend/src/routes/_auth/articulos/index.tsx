import { ArticuloTable } from '@/components/features/articulos/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/articulos/')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bienes Informáticos</CardTitle>
            </CardHeader>

            <CardContent>
                <ArticuloTable />
            </CardContent>
        </Card>
    );
}
