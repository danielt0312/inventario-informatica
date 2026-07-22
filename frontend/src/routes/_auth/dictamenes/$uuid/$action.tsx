import { createFileRoute, redirect } from '@tanstack/react-router';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import type { TResponse } from '@/types/generics';
import {
    ActionDictamenLabels,
    ActionDictamenStates
} from './-constants';
import type { DetailedDictamen } from '@/types/dictamenes';
import { View } from '@/views/dictamenes/actions/view';
import { isDetailedActionDictamen } from './-utils';
import api from '@/lib/axios';
import z from 'zod';

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
            queryFn: () => api.get<TResponse<DetailedDictamen>>(`api/dictamenes/${params.uuid}`, {
                params: {
                    include: 'versionActual.adquisiciones'
                }
            })
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
