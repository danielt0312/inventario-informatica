import GoBackButton from "@/components/Goback";
import { Route as EditarRoute } from "@/routes/_auth/dictamenes/$uuid/corregir";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DictamenCorregirForm } from "./form";
import { ShowVersionInfo } from "../../partials/show-info";

export const DictamenCorregirView = () => {
    const { dictamen } = EditarRoute.useRouteContext();

    return (
        <>
            <GoBackButton />

            <Card>
                <CardHeader>
                    <CardTitle>
                        Corrección de Dictamen
                    </CardTitle>
                    <CardAction>
                        <ShowVersionInfo dictamen={dictamen} />
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <DictamenCorregirForm />
                </CardContent>
            </Card>
        </>
    );
}
