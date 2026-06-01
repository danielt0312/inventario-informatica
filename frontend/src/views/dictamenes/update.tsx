import Goback from "@/components/Goback"
import { Form } from "./partials/form"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTitle, SidebarSteps } from "./partials/form-steps";
import { Route } from "@/routes/_auth/dictamenes/$uuid/$action";

export function View() {
    const { dictamen: data } = Route.useRouteContext();

    return (
        <>
            <Goback />
            <SidebarSteps step={data.estado.id}>
                <CardHeader>
                    <CardTitle>
                        {getTitle(data.estado.id).toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <Form />
                </CardContent>
            </SidebarSteps>
        </>
    )
}
