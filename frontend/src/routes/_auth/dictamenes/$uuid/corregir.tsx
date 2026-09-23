import { createFileRoute, redirect } from '@tanstack/react-router'
import { detailedDictamenQueryOptions } from './-queries'
import { isDetailedCorregibleFormActionDictamen } from './-utils';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import { DictamenCorregirView } from '@/views/dictamenes/form-actions/corregir/view';

export const Route = createFileRoute('/_auth/dictamenes/$uuid/corregir')({
    component: DictamenCorregirView,
    beforeLoad: async ({ context, params }) => {
        const dictamen = await context.queryClient.fetchQuery(detailedDictamenQueryOptions(params.uuid));

        // todo mostrar mensaje notificando que no puede realizar esto
        if (!isDetailedCorregibleFormActionDictamen(dictamen)) {
            throw redirect({ to: IndexRoute.to });
        }

        return { dictamen };
    }
});
