import Goback from "@/components/Goback"
import { Form } from "./partials/form"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTitle, OrderDictamenEstado, SidebarSteps } from "./partials/form-steps";

export function DictamenCreate() {
    const step: OrderDictamenEstado = undefined;

    return (
        <>
            <Goback />
            <SidebarSteps step={step}>
                <CardHeader>
                    <CardTitle>
                        {getTitle(step).toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <Form />
                </CardContent>
            </SidebarSteps>
        </>
    )
}
