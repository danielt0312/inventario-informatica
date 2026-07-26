import { createFileRoute, redirect } from '@tanstack/react-router'
import { detailedDictamenQueryOptions } from './-queries'
import { isDetailedEditableActionDictamen } from './-utils';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import { DictamenEditarView } from '@/views/dictamenes/editar/view';

export const Route = createFileRoute('/_auth/dictamenes/$uuid/editar')({
    component: DictamenEditarView,
    beforeLoad: async ({ context, params }) => {
        const dictamen = await context.queryClient.fetchQuery(detailedDictamenQueryOptions(params.uuid));

        // todo mostrar mensaje notificando que no puede realizar esto
        if (!isDetailedEditableActionDictamen(dictamen)) {
            throw redirect({ to: IndexRoute.to });
        }

        return { dictamen };
    }
});
