import { DataTableColumnHeaderSorting } from "@/components/ui/datatable"
import { RowAction } from "@/components/ui/datatable/row"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import type { TCatalogo } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"
import { FileText, Trash2 } from "lucide-react"

export type Articulo = {
    id: number
    numero_inventario: string
    numero_serie: string | null
    producto: TCatalogo & {
        tipo: TCatalogo & {
            categoria: TCatalogo
        }
    }
    estado: TCatalogo
    created_at: Date
}

export const columns: ColumnDef<Articulo>[] = [
    {
        header: "No. de Inventario",
        accessorKey: "numero_inventario"
    },
    {
        header: "Categoría",
        accessorKey: "producto.tipo.categoria.nombre"
    },
    {
        header: "Producto",
        accessorKey: "producto.tipo.nombre"
    },
    {
        header: "Modelo",
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
        header: ({ column }) => (
            <DataTableColumnHeaderSorting column={column} title="Fecha de Creación" />
        ),
        accessorKey: 'created_at',
        cell: ({ getValue }) => {
            const date = getValue<Date>();
            if (!date) return '—';
            return new Date(date).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => {
    //         const data = row.original;

    //         return (
    //             <RowAction>
    //                 <DropdownMenuItem>
    //                     <FileText /> Ver
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem variant={'destructive'}>
    //                     <Trash2 /> Eliminar
    //                 </DropdownMenuItem>
    //             </RowAction>
    //     )}
    // }
]
