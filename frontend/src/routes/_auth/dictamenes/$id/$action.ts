import api from '@/lib/axios';
import { DictamenEstado } from '@/lib/constants';
import type { TResponse } from '@/lib/types';
import type { Dictamen } from '@/views/dictamenes/partials/table.cols';
import { View } from '@/views/dictamenes/update';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const ACTIONS = ['dictaminar', 'evidenciar', 'facturar', 'inventariar'] as const;
export type Action = (typeof ACTIONS)[number];

export const ACTION_TO_ESTADO = {
    dictaminar: DictamenEstado.POR_DICTAMINAR,
    evidenciar: DictamenEstado.REQUISITADO,
    facturar: DictamenEstado.POR_SURTIR,
    inventariar: DictamenEstado.SURTIDO,
} as const satisfies Record<Action, DictamenEstado>;

export const Route = createFileRoute('/_auth/dictamenes/$id/$action')({
    params: {
        parse: (rawParams) => ({
            id: z.coerce.number().int().parse(rawParams.id),
            action: z.enum(ACTIONS).parse(rawParams.action),
        }),
        stringify: (params) => ({
            id: String(params.id),
            action: params.action,
        }),
    },
    component: View,
    beforeLoad: async ({ context, params }) => {
        const { data } = await context.queryClient.ensureQueryData({
            queryKey: ['dictamen', params.id],
            queryFn: () => api.get<TResponse<Dictamen>>(`api/dictamenes/${params.id}`)
                .then(r => r.data)
        });

        if (data.estado.id) {

        }

        return { dictamen: data };
    }
});
