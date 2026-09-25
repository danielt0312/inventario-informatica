import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Table } from "./partials/table";

export function View() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table />
            </CardContent>
        </Card>
    );
}
