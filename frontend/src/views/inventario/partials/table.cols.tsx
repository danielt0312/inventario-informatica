import { RowAction } from "@/components/ui/datatable/row"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import type { ColumnDef } from "@tanstack/react-table"
import { FileText, Trash2 } from "lucide-react"

export type Inventario = {
    id: number
    numero_inventario: string
    tipo_producto: string
    numero_serie: string
    fecha_registro: string
    estado: string
}

export const columns: ColumnDef<Inventario>[] = [
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
        id: 'actions',
        cell: ({ row }) => {
            const data = row.original;

            return (
                <RowAction>
                    <DropdownMenuItem>
                        <FileText /> Ver
                    </DropdownMenuItem>
                    <DropdownMenuItem variant={'destructive'}>
                        <Trash2 /> Eliminar
                    </DropdownMenuItem>
                </RowAction>
        )}
    }
]
