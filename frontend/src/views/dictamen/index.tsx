import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./TableColumns";

import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";

import dictamen from "@/views/dictamen/dictamen.json"
import { Link } from "@tanstack/react-router";

import { Route as dictamenCreateRoute } from '@/routes/_auth/dictamen/create'

function Dictamen() {
    const data = dictamen;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
                <Link to={dictamenCreateRoute.to}>
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
