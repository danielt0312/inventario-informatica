import { DataTableColumnHeaderSorting } from "@/components/ui/datatable";
import { AllRowSelected, RowAction, RowSelected } from "@/components/ui/datatable/row";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { TCatalogo } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { FileText, Trash2 } from "lucide-react";

export type Documento = {
    id: number
    tipo: TCatalogo
    archivo: TCatalogo
    created_at: Date
}

export const columns: ColumnDef<Documento>[] = [
    {
        header: 'Tipo de Documento',
        accessorKey: 'tipo.nombre'
    },
    {
        header: 'Nombre del Archivo',
        accessorKey: 'archivo.nombre'
    },
    {
        header: 'Fecha de Subida',
        accessorKey: 'archivo.created_at',
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
];
