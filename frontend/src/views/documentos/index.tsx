import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table } from "./partials/table"

function Documentos() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Documentos almancenados</CardTitle>
            </CardHeader>

            <CardContent>
                <Table />
            </CardContent>
        </Card>
    )
}

export default Documentos
