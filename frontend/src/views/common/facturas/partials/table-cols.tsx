import type { Factura } from "@/types/documentos"
import type { ColumnDef } from "@tanstack/react-table"

export const getDefaultColumns = <TData extends Factura>(): ColumnDef<TData>[] => [
    {
        header: 'Fecha de emisión',
        accessorKey: 'fecha_emision'
    }
];
