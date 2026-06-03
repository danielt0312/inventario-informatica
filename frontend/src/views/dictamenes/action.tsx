import Goback from "@/components/Goback"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTitle, SidebarSteps } from "./partials/form-steps";
import { Route, type ActionDictamenEstado, type ValidatedDictamen } from "@/routes/_auth/dictamenes/$uuid/$action";
import { DictamenEstadoEnum } from "@/lib/constants";
import { Form as DictaminarForm } from "./partials/actions/dictaminar";

export const ActionForm = ({
    dictamen
}: {
    dictamen: ValidatedDictamen;
}) => ({
    [DictamenEstadoEnum.DICTAMINAR]: (<DictaminarForm dictamen={dictamen} />),
    [DictamenEstadoEnum.EVIDENCIAR]: 'evidenciar',
    [DictamenEstadoEnum.SURTIR]: 'facturar',
    [DictamenEstadoEnum.INVENTARIAR]: 'inventariar',
} as const satisfies Record<ActionDictamenEstado, React.ReactNode>)[dictamen.estado.id];

export function View() {
    const { dictamen } = Route.useRouteContext();

    return (
        <>
            <Goback />
            <SidebarSteps step={dictamen.estado.id}>
                <CardHeader>
                    <CardTitle>
                        {getTitle(dictamen.estado.id).toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 **:data-[slot='label']:grid **:data-[slot='label']:gap-2">
                    <ActionForm dictamen={dictamen} />
                </CardContent>
            </SidebarSteps>
        </>
    );
}
