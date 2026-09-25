import { DocumentoTable } from '@/components/features/documentos/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/documentos/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Documentos almancenados</CardTitle>
            </CardHeader>

            <CardContent>
                <DocumentoTable />
            </CardContent>
        </Card>
    );
}
