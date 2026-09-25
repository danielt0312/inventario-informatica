import { createFileRoute, redirect } from '@tanstack/react-router';
import { Route as IndexRoute } from '@/routes/_auth/dictamenes/index';
import { isDetailedActionFormDictamen } from '../../../../components/features/dictamenes/helpers';
import { detailedDictamenQueryOptions } from '../../../../components/features/dictamenes/queries';
import z from 'zod';
import GoBackButton from '@/components/Goback';
import { CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShowInfo } from '@/components/features/dictamenes/common';
import { ShowVersionInfo } from "@/components/features/dictamenes/common";
import { ActionDictamenLabels, ActionDictamenStates } from '@/components/features/dictamenes/form-action/constants';
import { dictamenFormActionGetTitle, DictamenFormActionWizard } from '@/components/features/dictamenes/form-action/wizard-layout';
import { DictamenFormAction } from '@/components/features/dictamenes/form-action/view';

export const Route = createFileRoute('/_auth/dictamenes/$uuid/$action')({
    params: {
        parse: (rawParams) => ({
            uuid: z.string().parse(rawParams.uuid),
            action: z.enum(ActionDictamenLabels).parse(rawParams.action),
        })
    },
    component: RouteComponent,
    beforeLoad: async ({ context, params }) => {
        const dictamen = await context.queryClient.fetchQuery(detailedDictamenQueryOptions(params.uuid));

        // todo mostrar mensaje notificando que no puede realizar esto
        if (!isDetailedActionFormDictamen(dictamen)) {
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


function RouteComponent() {
    const { dictamen } = Route.useRouteContext();

    return (
        <>
            <GoBackButton />

            <DictamenFormActionWizard step={dictamen.estado.id}>
                <CardHeader>
                    <CardTitle>
                        {dictamenFormActionGetTitle(dictamen.estado.id).toUpperCase()}
                    </CardTitle>
                    <CardAction>
                        <ShowVersionInfo dictamen={dictamen} />
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 **:data-[slot='label-container']:grid **:data-[slot='label-container']:gap-2 **:data-[slot='label-container']:text-wrap">
                    <ShowInfo dictamen={dictamen} />

                    <DictamenFormAction dictamen={dictamen} />
                </CardContent>
            </DictamenFormActionWizard>
        </>
    );
}
