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
            <CardHeader className="flex flex-row items-center justify-between">
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
