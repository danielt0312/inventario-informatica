import type { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

interface Dictamen {
    id: number;
    area_solicitante: string;
    fecha_solicitud: string;
    estado: string;
}

const columns: ColumnDef<Dictamen>[] = [
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
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical />
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
