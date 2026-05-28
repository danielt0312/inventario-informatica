import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "./partials/table";

function Dictamen() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table />
            </CardContent>
        </Card>
    )
}

export default Dictamen
