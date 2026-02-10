import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"

import { columns } from "./index.table-cols"
import data from "./data.json"
import { Button } from "@/components/ui/button"
import { FaPlusCircle } from "react-icons/fa"
import { Link } from "@tanstack/react-router"

import { Route as RouteCreate } from "@/routes/_auth/inventario/create"

function Inventario() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Inventario de Bienes Informáticos
                </CardTitle>
                <Link to={RouteCreate.to}>
                    <Button>
                        <FaPlusCircle /> Crear
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}

export default Inventario
