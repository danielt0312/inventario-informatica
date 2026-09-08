import { EvidenciarAcuseResguardoForm } from '@/components/features/resguardos/evidenciar-acuse/form';
import { esResguardoEstadoPendienteAcuse } from '@/components/features/resguardos/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/axios';
import type { TResponse } from '@/types/generics';
import type { Resguardo } from '@/types/resguardos';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/resguardos/$uuid/inspeccionar')({
    component: RouteComponent,
    beforeLoad: async ({ context, params }) => {
        const resguardo = await context.queryClient.fetchQuery({
            queryKey: ['resguardo', params.uuid],
            queryFn: () => api.get<TResponse<Resguardo>>(`api/resguardos/${params.uuid}`)
                .then(r => r.data.data)
        })

        return { resguardo };
    }
});

function RouteComponent() {
    const { resguardo } = Route.useRouteContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inspeccionar Resguardo</CardTitle>
            </CardHeader>

            <CardContent>
                {esResguardoEstadoPendienteAcuse(resguardo.estado.id) && <EvidenciarAcuseResguardoForm resguardo={resguardo} />}
            </CardContent>
        </Card>
    );
}
