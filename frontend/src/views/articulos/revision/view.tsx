import Goback from "@/components/Goback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function View() {
    return (
        <>
            <Goback />

            <Card>
                <CardHeader>
                    <CardTitle>Revisión y Configuración</CardTitle>
                </CardHeader>

                <CardContent>
                </CardContent>
            </Card>
        </>
    );
}

export {
    View as InventarioRevisionView
}
