import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

import { Route as RouteCreate } from "@/routes/_auth/inventario/create"
import { ButtonGroup } from "@/components/ui/button-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, PlusCircle } from "lucide-react"
import { Table } from "./partials/table"

function Inventario() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Inventario de Bienes Informáticos
                </CardTitle>

                <ButtonGroup>
                    <Button variant={"outline"}>
                        <PlusCircle /> Registrar
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"outline"}>
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                <Link to={RouteCreate.to}>
                                    <DropdownMenuItem>
                                        Artículo Existente
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>
                                    Ingreso por Dictámen Tecnológico
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ButtonGroup>
            </CardHeader>
            <CardContent>
                <Table />
            </CardContent>
        </Card>
    )
}

export default Inventario
