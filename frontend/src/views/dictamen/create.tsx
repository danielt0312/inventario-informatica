import Goback from "@/components/Goback"
import { Form } from "./partials/form"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTitle, SidebarSteps } from "./partials/form-steps";

export function Create() {
    return (
        <>
            <Goback />
            <SidebarSteps>
                <CardHeader>
                    <CardTitle>
                        {getTitle().toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <Form />
                </CardContent>
            </SidebarSteps>
        </>
    )
}
