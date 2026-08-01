import Goback from "@/components/Goback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DictamenEditarForm } from "./form";

export const DictamenEditarView = () => {
    return (
        <>
            <Goback />

            <Card>
                <CardHeader>
                    <CardTitle>
                        Edición de Dictamen
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <DictamenEditarForm />
                </CardContent>
            </Card>
        </>
    );
}
