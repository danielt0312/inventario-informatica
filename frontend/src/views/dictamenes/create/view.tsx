import Goback from "@/components/Goback"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTitle, SidebarSteps } from "../actions/partials/form-steps";
import { Form } from "./form";

export function View() {
    return (
        <>
            <Goback />
            <SidebarSteps>
                <CardHeader>
                    <CardTitle>
                        {getTitle().toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form />
                </CardContent>
            </SidebarSteps>
        </>
    )
}
