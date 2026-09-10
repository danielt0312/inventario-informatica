import { ActualizarArticuloForm } from '@/components/features/articulos/actualizar/form'
import GoBackButton from '@/components/Goback'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import api from '@/lib/axios'
import type { Articulo } from '@/types/articulos'
import type { TResponse } from '@/types/generics'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const articuloQueryOptions = (uuid: string) => queryOptions({
    queryKey: ['articulos', uuid],
    queryFn: () => api.get<TResponse<Articulo>>(`api/articulos/${uuid}`)
        .then(r => r.data.data)
});

export const Route = createFileRoute('/_auth/articulos/$uuid/actualizar')({
    component: RouteComponent,
    loader: ({ context, params }) =>
        context.queryClient.ensureQueryData(articuloQueryOptions(params.uuid))
});

function RouteComponent() {
    const { uuid } = Route.useParams();
    const { data: articulo } = useSuspenseQuery(articuloQueryOptions(uuid));

    return (
        <>
            <GoBackButton />

            <Card>
                <CardHeader>
                    <CardTitle>
                        Actualización de Equipo
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <ActualizarArticuloForm articulo={articulo} />
                </CardContent>
            </Card>
        </>
    )
}
