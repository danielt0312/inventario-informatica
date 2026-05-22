import Goback from "@/components/Goback"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "./partials/form"

function DictamenCreate() {
    return (
        <>
            <Goback />
            <Card>
                <CardHeader>
                    <CardTitle>Crear</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <Form />
                </CardContent>
            </Card>
        </>
    )
}

export default DictamenCreate
