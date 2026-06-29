import Goback from "@/components/Goback"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route } from "@/routes/_auth/dictamenes/$uuid/$action";
import { getTitle, SidebarSteps } from "./partials/form-steps";
import { ActionForm } from "./partials/form";
import { ShowInfo } from "./partials/show-info";

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
                <CardContent className="flex flex-col gap-6 **:data-[slot='label']:grid **:data-[slot='label']:gap-2 **:data-[slot='label']:text-wrap">
                    <ShowInfo dictamen={dictamen}/>

                    <ActionForm dictamen={dictamen} />
                </CardContent>
            </SidebarSteps>
        </>
    );
}
