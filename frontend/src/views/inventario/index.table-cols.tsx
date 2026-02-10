import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { FaEllipsisV } from "react-icons/fa"

type Inventario = {
    id: number
    tipo_producto: string
    numero_serie: string
    fecha_registro: string
    estado: string
}

const columns: ColumnDef<Inventario>[] = [
    {
        header: "Folio",
        accessorKey: "id"
    },
    {
        header: "Tipo de Producto",
        accessorKey: "tipo_producto"
    },
    {
        header: "No. Serie",
        accessorKey: "numero_serie"
    },
    {
        header: "Fecha de Registro",
        accessorKey: "fecha_registro"
    },
    {
        header: "Estado",
        accessorKey: "estado"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const articulo = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            <span className="sr-only">Open</span>
                            <FaEllipsisV />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Revisar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Dar de baja
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export {
    type Inventario,
    columns
}
