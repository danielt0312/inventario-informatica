import { createFileRoute, redirect } from '@tanstack/react-router'
import { detailedDictamenQueryOptions } from '../../../../components/features/dictamenes/queries'
import { isDetailedCorregibleFormActionDictamen } from '../../../../components/features/dictamenes/helpers';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import { DictamenCorregirView } from '@/components/features/dictamenes/corregir/view';

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
