import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticuloTable } from "../../components/features/articulos/table"

function Inventario() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Inventario de Bienes Informáticos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ArticuloTable />
            </CardContent>
        </Card>
    )
}

export default Inventario
