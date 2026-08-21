import { isArticuloEstadoRevision } from '@/components/features/articulos/utils';
import api from '@/lib/axios';
import type { Articulo } from '@/types/articulos';
import type { TResponse } from '@/types/generics';
import { InventarioRevisionView } from '@/views/articulos/revision/view';
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod';
import { Route as IndexRoute } from "../index";

export const Route = createFileRoute(
    '/_auth/articulos/$uuid/verificar-y-configurar',
)({
    params: {
        parse: ({ uuid }) => ({
            uuid: z.string().parse(uuid),
        })
    },
    component: InventarioRevisionView,
    beforeLoad: async ({ context, params }) => {
        const articulo = await context.queryClient.fetchQuery({
            queryKey: ['articulos', params.uuid],
            queryFn: () => api.get<TResponse<Articulo>>(`api/articulos/${params.uuid}`)
                .then(r => r.data.data),
        });

        if (! isArticuloEstadoRevision(articulo.estado.id)) {
            throw redirect({
                to: IndexRoute.to
            })
        }

        return { articulo };
    }
});
