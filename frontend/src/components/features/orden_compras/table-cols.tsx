import type { OrdenCompra } from "@/types/orden_compras";
import type { ColumnDef, InitialTableState } from "@tanstack/react-table"
import { ArchivoActionRow } from "../archivos/table-cols";
import { toLocaleDateFormat } from "@/lib/utils";

const defaultColumns: ColumnDef<OrdenCompra>[] = [
    {
        id: 'orden.numero_orden',
        header: 'Orden No.',
        accessorFn: ({ numero_orden }) => numero_orden
    },
    {
        id: 'orden.fecha_solicitud',
        header: 'Fecha de solicitud',
        accessorFn: ({ fecha_solicitud }) => toLocaleDateFormat(fecha_solicitud)
    },
    {
        id: 'orden.proveedor.nombre',
        header: 'Proveedor',
        accessorFn: ({ proveedor }) => `${proveedor.nombre} — ${proveedor.rfc}`
    },
    ArchivoActionRow<OrdenCompra>((row) => row.archivo),
];

const initialTableState: InitialTableState = {
    columnOrder: ['orden.numero_orden', 'orden.fecha_solicitud', 'orden.proveedor.nombre', 'archivo.actions']
}

export {
    defaultColumns as ordenCompraDefaultColumns,
    initialTableState as ordenCompraInitialTableState
}
