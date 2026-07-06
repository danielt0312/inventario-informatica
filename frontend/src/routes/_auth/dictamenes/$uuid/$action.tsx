import api from '@/lib/axios';
import { DictamenEstadoEnum, DictaminadoDictamenEstadoEnum } from '@/lib/constants';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import type { TResponse } from '@/types/generics';
import { type ActionDictamenUnion, type ActionDictamenWithDictamenProductosUnion } from './-types';
import {
    ActionLabels,
    ActionStates
} from "./-constants";
import type { Dictamen, DictamenWithDictamenProductos, DictaminadoDictamen, DictaminarDictamen, DictaminarDictamenWithDictamenProductos, SurtirDictamen, SurtirDictamenWithDictamenProductos } from '@/types/dictamenes';
import { View } from '@/views/dictamenes/actions/view';

export function isActionDictamen(dictamen: Dictamen): dictamen is ActionDictamenUnion {
    return dictamen.estado.id in ActionStates;
}

export function isDictaminarDictamen(dictamen: Dictamen): dictamen is DictaminarDictamen {
    return dictamen.estado.id === DictamenEstadoEnum.DICTAMINAR;
}

export function isDictaminadoDictamen(dictamen: Dictamen): dictamen is DictaminadoDictamen {
    return dictamen.estado.id !== DictamenEstadoEnum.DICTAMINAR;
}

export function isSurtirDictamen(dictamen: Dictamen): dictamen is SurtirDictamen {
    return dictamen.estado.id === DictaminadoDictamenEstadoEnum.SURTIR;
}

export function isActionDictamenWithProductos(dictamen: DictamenWithDictamenProductos): dictamen is ActionDictamenWithDictamenProductosUnion {
    return dictamen.estado.id in ActionStates;
}

export function isDictaminarDictamenWithProductos(dictamen: DictamenWithDictamenProductos): dictamen is DictaminarDictamenWithDictamenProductos {
    return dictamen.estado.id === DictamenEstadoEnum.DICTAMINAR;
}

export function isSurtirDictamenWithProductos(dictamen: DictamenWithDictamenProductos): dictamen is SurtirDictamenWithDictamenProductos {
    return dictamen.estado.id === DictaminadoDictamenEstadoEnum.SURTIR;
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

        if (!isActionDictamenWithProductos(data)) {
            throw redirect({ to: IndexRoute.to });
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
            dictamen: data
        };
    }
});
