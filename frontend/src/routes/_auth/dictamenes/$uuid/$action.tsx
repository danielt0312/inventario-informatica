import api from '@/lib/axios';
import { DictamenEstadoEnum } from '@/lib/constants';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import type { TResponse } from '@/types/generics';
import {
    ActionLabels,
    ActionStates,
    type ActionDictamen,
    type ActionDictamenWithDictamenProductos,
    type DictaminadoDictamen
} from './-types';
import type { Dictamen, DictamenWithDictamenProductos } from '@/types/dictamenes';
import { View } from '@/views/dictamenes/actions/view';

export function isActionDictamen(dictamen: Dictamen): dictamen is ActionDictamen {
    return dictamen.estado.id in ActionStates;
}

export function isDictaminadoDictamen(dictamen: Dictamen): dictamen is DictaminadoDictamen {
    return dictamen.estado.id !== DictamenEstadoEnum.DICTAMINAR;
}

export const Route = createFileRoute('/_auth/dictamenes/$uuid/$action')({
    params: {
        parse: (rawParams) => ({
            uuid: z.string().parse(rawParams.uuid),
            action: z.enum(ActionLabels).parse(rawParams.action),
        })
    },
    component: View,
    beforeLoad: async ({ context, params }) => {
        const data = await context.queryClient.fetchQuery({
            queryKey: ['dictamenes', params.uuid],
            queryFn: () => api.get<TResponse<DictamenWithDictamenProductos>>(`api/dictamenes/${params.uuid}`)
                .then(r => r.data.data)
        });

        switch (data.estado.id) {
            case DictamenEstadoEnum.SURTIDO:
            case DictamenEstadoEnum.SURTIDO_PARCIAL:
                // todo notificar a usuario de que no se puede acceder por tal motivo
                throw redirect({ to: IndexRoute.to });
            default:
                break;
        }

        if (ActionStates[data.estado.id] !== params.action) {
            throw redirect({
                to: Route.to,
                params: {
                    uuid: data.uuid,
                    action: ActionStates[data.estado.id]
                }
            });
        }

        return {
            dictamen: data as ActionDictamenWithDictamenProductos
        };
    }
});
