import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./TableColumns";

import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";

import dictamen from "@/views/dictamen/dictamen.json"

function Dictamen() {
    const data = dictamen;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="uppercase font-black text-lg">
                    Dictámenes Tecnológicos
                </CardTitle>
                <Button>
                    <FaPlusCircle />
                    Crear
                </Button>
            </CardHeader>

            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}

export default Dictamen
