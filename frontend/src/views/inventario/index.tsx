import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"

import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

import { Route as RouteCreate } from "@/routes/_auth/inventario/create"
import { ButtonGroup } from "@/components/ui/button-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { ChevronDown, EllipsisVertical, Eye, PlusCircle } from "lucide-react"
import { Label } from "@/components/ui/label"

type Inventario = {
    id: number
    numero_inventario: string
    tipo_producto: string
    numero_serie: string
    fecha_registro: string
    estado: string
}
const columns: ColumnDef<Inventario>[] = [
    {
        header: "No. de Inventario",
        accessorKey: "numero_inventario"
    },
    {
        header: "Tipo de Producto",
        accessorKey: "producto.nombre"
    },
    {
        header: "No. Serie",
        accessorKey: "numero_serie",
        cell: ({ row }) => !!row.original.numero_serie ? row.original.numero_serie : (
            <Label className="italic text-neutral-400">
                Sin dato
            </Label>
        )
    },
    {
        header: "Estado",
        accessorKey: "estado.nombre"
    },
    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Eye color="black" /> Inspeccionar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

function Inventario() {
    const { data = [] } = useQuery({
        queryKey: ['articulos'],
        queryFn: async () => {
            const { data: axiosData } = await api.get<{ data: Inventario[] }>('api/articulos')
            return axiosData.data;
        }
    })

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
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}

export default Inventario
