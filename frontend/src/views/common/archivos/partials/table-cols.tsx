import { ActionMenu, ActionMenuItem } from "@/components/composed/action-menu";
import type { Archivo } from "@/types/documentos";
import type { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";

export const NombreArchivoRow = <TData extends Archivo>(props: ColumnDef<TData>): ColumnDef<TData> => ({
    header: 'Nombre del Archivo',
    ...props
});

export const FechaSubidaRow = <TData extends Archivo>(props: ColumnDef<TData>): ColumnDef<TData> => ({
    header: 'Fecha de Subida',
    cell: ({ getValue }) => {
        const date = getValue<Date>();

        return new Date(date).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    ...props
});

export const ActionRow = <TData extends Archivo>(props: ColumnDef<TData>): ColumnDef<TData> => ({
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
                    <EyeIcon /> Ver
                </ActionMenuItem>
            </ActionMenu>
        );
    },
    ...props
});
