import type { Factura } from "@/types/documentos"
import type { ColumnDef, InitialTableState } from "@tanstack/react-table";
import { archivoTableInitialState, getArchivoDefaultColumns } from "../../archivos/partials/table-cols";
import { toLocaleDateFormat } from "@/lib/utils";

const getDefautColumns = (): ColumnDef<Factura>[] => [
    ...getArchivoDefaultColumns<Factura>((row) => row.archivo),
    {
        id: 'factura.fecha_emision',
        header: 'Fecha de emisión',
        cell: ({ row }) => toLocaleDateFormat(row.original.fecha_emision)
    }
];

const initialState: InitialTableState = {
    columnOrder: ['factura.fecha_emision', ...(archivoTableInitialState?.columnOrder ?? [])]
}

export {
    getDefautColumns as getFacturaDefaultColumns,
    initialState as facturaTableInitialState
}
