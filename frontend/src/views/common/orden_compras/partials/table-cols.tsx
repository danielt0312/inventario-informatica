import type { OrdenCompra } from "@/types/orden_compras";
import type { ColumnDef } from "@tanstack/react-table"

export const defaultColumns: ColumnDef<OrdenCompra>[] = [
    {
        header: 'Fecha de emisión',
        accessorKey: 'fecha_emision'
    }
];
