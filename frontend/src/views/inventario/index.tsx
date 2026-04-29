import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table } from "./partials/table"

function Inventario() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Inventario de Bienes Informáticos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table />
            </CardContent>
        </Card>
    )
}

export default Inventario
