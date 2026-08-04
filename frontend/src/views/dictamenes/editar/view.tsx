import Goback from "@/components/Goback";
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/editar";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DictamenEditarForm } from "./form";
import { ShowVersionInfo } from "../partials/show-info";

export const DictamenEditarView = () => {
    const { dictamen } = EditarRoute.useRouteContext();

    return (
        <>
            <Goback />

            <Card>
                <CardHeader>
                    <CardTitle>
                        Edición de Dictamen
                    </CardTitle>
                    <CardAction>
                        <ShowVersionInfo dictamen={dictamen} />
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <DictamenEditarForm />
                </CardContent>
            </Card>
        </>
    );
}
