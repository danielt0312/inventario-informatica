import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentoTable } from "./partials/table"

export function View() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Documentos almancenados</CardTitle>
            </CardHeader>

            <CardContent>
                <DocumentoTable />
            </CardContent>
        </Card>
    )
}
