import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";

import dictamen from "@/views/dictamen/data.json"
import { Link } from "@tanstack/react-router";

import { Route as RouteCreate } from '@/routes/_auth/dictamen/create'
import { columns } from "./index.table-cols";

function Dictamen() {
    const data = dictamen;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
                <Link to={RouteCreate.to}>
                    <Button>
                        <FaPlusCircle />
                        Crear
                    </Button>
                </Link>
            </CardHeader>

            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}

export default Dictamen
