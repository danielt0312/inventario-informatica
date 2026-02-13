import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"

import { columns } from "./index.table-cols"
import data from "./data.json"
import { Button } from "@/components/ui/button"
import { FaChevronDown, FaPlusCircle } from "react-icons/fa"
import { Link } from "@tanstack/react-router"

import { Route as RouteCreate } from "@/routes/_auth/inventario/create"
import { ButtonGroup } from "@/components/ui/button-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function Inventario() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Inventario de Bienes Informáticos
                </CardTitle>

                <ButtonGroup>
                    <Button
                        variant={"outline"}
                    >
                        <FaPlusCircle /> Registrar
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"outline"}>
                                <FaChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" id="dropdown_content">
                            <DropdownMenuGroup>
                                <Link to={RouteCreate.to}>
                                    <DropdownMenuItem>
                                        Artículo Existente
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                    Nuevo Ingreso
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ButtonGroup>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}

export default Inventario
