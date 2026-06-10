import type { Documento } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";

export type Column = ColumnDef<Documento>;

export const defaultColumns: Column[] = [
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
    }
];

export const columns: Column[] = [
    {
        header: 'Tipo de Documento',
        accessorKey: 'documento_tipo'
    },
];
