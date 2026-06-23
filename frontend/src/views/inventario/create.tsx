import Goback from "@/components/Goback"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form as FormArticulo } from "../articulos/partials/form";

function Create() {
    return (
        <>
            <Goback />

            <Card>
                <CardHeader>
                    <CardTitle>Registro de Artículo existente</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* <FormArticulo /> */}
                </CardContent>
            </Card>
        </>
    )
}

export default Create
