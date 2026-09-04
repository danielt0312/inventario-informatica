import GoBackButton from "@/components/Goback"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dictamenFormActionGetTitle, SidebarSteps } from "../form-actions/partials/form-steps";
import { CreateDictamenForm } from "./form";

export function View() {
    return (
        <>
            <GoBackButton />
            <SidebarSteps>
                <CardHeader className="mt-14">
                    <CardTitle>
                        {dictamenFormActionGetTitle().toUpperCase()}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateDictamenForm />
                </CardContent>
            </SidebarSteps>
        </>
    )
}
