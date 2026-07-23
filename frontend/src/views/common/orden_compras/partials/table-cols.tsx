import type { OrdenCompra } from "@/types/orden_compras";
import type { ColumnDef } from "@tanstack/react-table"

export const defaultColumns: ColumnDef<OrdenCompra>[] = [
    {
        header: 'Orden No.',
        accessorKey: 'numero_orden'
    },
    {
        header: 'Fecha de solicitud',
        accessorKey: 'fecha_solicitud'
    },
    {
        header: 'Proveedor',
        accessorKey: 'proveedor.nombre'
    }
];
