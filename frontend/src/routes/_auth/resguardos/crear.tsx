import { CreateResguardoForm } from '@/components/features/resguardos/create/form';
import GoBackButton from '@/components/Goback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/resguardos/crear')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <GoBackButton />

            <Card>
                <CardHeader>
                    <CardTitle>
                        Creación de Resguardo
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <CreateResguardoForm />
                </CardContent>
            </Card>
        </>
    );
}
