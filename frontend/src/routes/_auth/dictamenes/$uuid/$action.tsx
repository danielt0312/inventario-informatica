import api from '@/lib/axios';
import { DictamenEstadoEnum } from '@/lib/constants';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import type { TResponse } from '@/types/generics';
import type {
    ActionDictamenUnion,
    ActionDictamenWithDictamenProductosUnion,
    ActionDictaminadoDictamen,
    ActionDictaminarDictamen,
    ActionDictaminarDictamenWithDictamenProductos,
} from './-types';
import {
    ActionDictamenEstadoEnum,
    ActionDictamenLabels,
    ActionDictamenStates
} from './-constants';
import type {
    Dictamen,
    DictamenWithDictamenProductos,
    SurtirDictamen,
} from '@/types/dictamenes';
import { View } from '@/views/dictamenes/actions/view';

export function isSurtirDictamen(dictamen: Dictamen): dictamen is SurtirDictamen {
    return dictamen.estado.id === DictamenEstadoEnum.SURTIR;
}

export function isActionDictamen(dictamen: Dictamen): dictamen is ActionDictamenUnion {
    return dictamen.estado.id in ActionDictamenStates;
}

export function isActionDictaminar(dictamen: Dictamen): dictamen is ActionDictaminarDictamen {
    return dictamen.estado.id === ActionDictamenEstadoEnum.DICTAMINAR;
}

export function isActionDictaminadoDictamen(dictamen: Dictamen): dictamen is ActionDictaminadoDictamen {
    return !isActionDictaminar(dictamen);
}

export function isActionDictamenWithDictamenProductos(dictamen: DictamenWithDictamenProductos): dictamen is ActionDictamenWithDictamenProductosUnion {
    return isActionDictamen(dictamen);
}

export function isActionDictaminarDictamenWithDictamenProductos(dictamen: DictamenWithDictamenProductos): dictamen is ActionDictaminarDictamenWithDictamenProductos {
    return isActionDictaminar(dictamen);
}

export const Route = createFileRoute('/_auth/dictamenes/$uuid/$action')({
    params: {
        parse: (rawParams) => ({
            uuid: z.string().parse(rawParams.uuid),
            action: z.enum(ActionDictamenLabels).parse(rawParams.action),
        })
    },
    component: View,
    beforeLoad: async ({ context, params }) => {
        const data = await context.queryClient.fetchQuery({
            queryKey: ['dictamenes', params.uuid],
            queryFn: () => api.get<TResponse<DictamenWithDictamenProductos>>(`api/dictamenes/${params.uuid}`)
                .then(r => r.data.data)
        });

        if (!isActionDictamenWithDictamenProductos(data)) {
            throw redirect({ to: IndexRoute.to });
        }

        if (ActionDictamenStates[data.estado.id] !== params.action) {
            throw redirect({
                to: Route.to,
                params: {
                    uuid: data.uuid,
                    action: ActionDictamenStates[data.estado.id]
                }
            });
        }

        return {
            dictamen: data
        };
    }
});
