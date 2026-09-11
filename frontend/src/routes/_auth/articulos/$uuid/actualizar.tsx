import type { Articulo } from '@/types/articulos'
import type { TResponse } from '@/types/generics'
import { ActualizarArticuloForm } from '@/components/features/articulos/actualizar/form'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import GoBackButton from '@/components/Goback'
import api from '@/lib/axios'

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
                <CardContent>
                    <CardTitle>
                        Actualización de componentes internos de {articulo.producto.tipo.nombre}
                    </CardTitle>
                </CardContent>

                <ActualizarArticuloForm articulo={articulo} />
            </Card>
        </>
    )
}
