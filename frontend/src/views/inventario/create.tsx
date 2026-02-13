import Goback from "@/components/Goback"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormProducto from "./partials/forms/producto"

function InventarioCreate() {
    return (
        <>
            <Goback />
            <Card>
                <CardHeader>
                    <CardTitle>Registro de Artículo existente</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormProducto />
                </CardContent>
            </Card>
        </>
    )
}

export default InventarioCreate
