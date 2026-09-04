import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticuloTable } from "./partials/table";

function View() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Inventario de Bienes Informáticos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ArticuloTable />
            </CardContent>
        </Card>
    );
}

export {
    View as ArticuloIndexView
}
