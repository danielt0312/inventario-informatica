import type { OrdenCompra } from "@/types/orden_compras";
import type { ColumnDef, InitialTableState } from "@tanstack/react-table"
import { ArchivoActionRow } from "../../archivos/partials/table-cols";

const defaultColumns: ColumnDef<OrdenCompra>[] = [
    {
        id: 'orden.numero_orden',
        header: 'Orden No.',
        accessorKey: 'numero_orden'
    },
    {
        id: 'orden.fecha_solicitud',
        header: 'Fecha de solicitud',
        accessorKey: 'fecha_solicitud'
    },
    {
        id: 'orden.proveedor.nombre',
        header: 'Proveedor',
        accessorKey: 'proveedor.nombre'
    },
    ArchivoActionRow<OrdenCompra>((row) => row.archivo),
];

const initialTableState: InitialTableState = {
    columnOrder: ['orden.numero_orden', 'orden.fecha_solicitud', 'orden.proveedor.nombre', 'archivo.actions']
}

export { defaultColumns as ordenCompraDefaultColumns, initialTableState as ordenCompraInitialTableState }
