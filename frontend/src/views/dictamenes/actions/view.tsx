import Goback from "@/components/Goback"
import { CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route } from "@/routes/_auth/dictamenes/$uuid/$action";
import { getTitle, SidebarSteps } from "./partials/form-steps";
import { ActionForm } from "./partials/form";
import { ShowInfo } from "./partials/show-info";
import { ShowVersionInfo } from "../partials/show-info";

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
                    <CardAction>
                        <ShowVersionInfo dictamen={dictamen} />
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 **:data-[slot='label-container']:grid **:data-[slot='label-container']:gap-2 **:data-[slot='label-container']:text-wrap">
                    <ShowInfo dictamen={dictamen} />

                    <ActionForm dictamen={dictamen} />
                </CardContent>
            </SidebarSteps>
        </>
    );
}
