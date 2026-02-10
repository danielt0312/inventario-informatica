'use client'

import type { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaEllipsisV } from "react-icons/fa";

type Dictamen = {
    id: number
    area_solicitante: string
    fecha_solicitud: string
    estado: string
}

const columns: ColumnDef<Dictamen>[] = [
    {
        accessorKey: "id",
        header: "Folio",
    },
    {
        accessorKey: "area_solicitante",
        header: "Área Solicitante",
    },
    {
        accessorKey: "fecha_solicitud",
        header: "Fecha de Solicitud",
    },
    {
        accessorKey: "estado",
        header: "Estado",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const dictamen = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            <span className="sr-only">Open menu</span>
                            <FaEllipsisV />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Revisar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Editar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]

export {
    type Dictamen,
    columns
}
