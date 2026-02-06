import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./TableColumns";

import dictamen from './dictamen.json'

function Dictamen() {
    const data = dictamen;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="uppercase font-black text-lg">
                        Dictámenes Tecnológicos
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </>
    );
}

export default Dictamen
