import { createFileRoute, redirect } from '@tanstack/react-router';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import {
    ActionDictamenLabels,
    ActionDictamenStates
} from './-constants';
import { View } from '@/views/dictamenes/actions/view';
import { isDetailedActionDictamen } from './-utils';
import { detailedDictamenQueryOptions } from './-queries';
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
        const dictamen = await context.queryClient.fetchQuery(detailedDictamenQueryOptions(params.uuid));

        // todo mostrar mensaje notificando que no puede realizar esto
        if (!isDetailedActionDictamen(dictamen)) {
            throw redirect({ to: IndexRoute.to });
        }

        const actualState = ActionDictamenStates[dictamen.estado.id];
        if (actualState !== params.action) {
            throw redirect({
                to: Route.to,
                params: {
                    uuid: dictamen.uuid,
                    action: actualState
                }
            });
        }

        return { dictamen };
    }
});
