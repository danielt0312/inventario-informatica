import { ActionMenu, ActionMenuItem } from "@/components/composed/action-menu";
import type { Documento } from "@/types/documentos";
import type { ColumnDef, InitialTableState } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export const getDefaultColumns = <TData extends Documento>(): ColumnDef<TData>[] => [
    {
        header: 'Nombre del Archivo',
        accessorKey: 'nombre'
    },
    {
        header: 'Fecha de Subida',
        accessorKey: 'created_at',
        cell: ({ getValue }) => {
            const date = getValue<Date>();

            return new Date(date).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },
    {
        id: 'actions',
        cell: ({ row, table }) => {
            const { uuid, nombre } = row.original;
            const { meta } = table.options;

            return (
                <ActionMenu>
                    <ActionMenuItem
                        disabled={meta?.isPreviewing}
                        onClick={() => meta?.previewFile?.(uuid, nombre ?? undefined)}
                    >
                        <Eye /> Ver
                    </ActionMenuItem>
                </ActionMenu>
            );
        }
    }
];

export const columns: ColumnDef<Documento>[] = [
    {
        header: 'Tipo de Documento',
        accessorKey: 'documento'
    }
];

export const initialState: InitialTableState = {
    columnOrder: ['documento', 'nombre', 'created_at', 'actions']
}
