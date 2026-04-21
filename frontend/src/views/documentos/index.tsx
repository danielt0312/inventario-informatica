import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Content } from "./index.content"

function Documentos() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Documentos almancenados</CardTitle>
            </CardHeader>

            <CardContent>
                <Content />
            </CardContent>
        </Card>
    )
}

export default Documentos
