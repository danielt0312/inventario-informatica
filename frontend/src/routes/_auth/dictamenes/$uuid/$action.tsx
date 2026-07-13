import api from '@/lib/axios';
import { DictamenEstadoEnum } from '@/lib/constants';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import type { TResponse } from '@/types/generics';
import type {
    ActionDictamen,
    DetailedActionDictamen,
    ActionDictaminadoDictamen,
    ActionDictaminarDictamen,
    DetailedActionDictaminarDictamen,
} from './-types';
import {
    ActionDictamenEstadoEnum,
    ActionDictamenLabels,
    ActionDictamenStates
} from './-constants';
import type {
    DetailedDictamen,
    Dictamen,
    SurtirDictamen,
} from '@/types/dictamenes';
import { View } from '@/views/dictamenes/actions/view';

export function isSurtirDictamen(dictamen: Dictamen): dictamen is SurtirDictamen {
    return dictamen.estado.id === DictamenEstadoEnum.SURTIR;
}

export function isActionDictamen(dictamen: Dictamen): dictamen is ActionDictamen {
    return dictamen.estado.id in ActionDictamenStates;
}

export function isActionDictaminarDictamen(dictamen: Dictamen): dictamen is ActionDictaminarDictamen {
    return dictamen.estado.id === ActionDictamenEstadoEnum.DICTAMINAR;
}

export function isActionDictaminadoDictamen(dictamen: Dictamen): dictamen is ActionDictaminadoDictamen {
    return !isActionDictaminarDictamen(dictamen);
}

export function isDetailedActionDictamen(dictamen: DetailedDictamen): dictamen is DetailedActionDictamen {
    return isActionDictamen(dictamen);
}

export function isDetailedActionDictaminarDictamen(dictamen: DetailedDictamen): dictamen is DetailedActionDictaminarDictamen {
    return isActionDictaminarDictamen(dictamen);
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
            queryFn: () => api.get<TResponse<DetailedDictamen>>(`api/dictamenes/${params.uuid}`)
                .then(r => r.data.data)
        });

        if (!isDetailedActionDictamen(data)) {
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
