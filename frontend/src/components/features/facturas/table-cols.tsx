import type { Factura } from "@/types/documentos"
import type { ColumnDef, InitialTableState } from "@tanstack/react-table";
import { ArchivoActionsRow, archivoTableInitialState } from "../archivos/table-cols";
import { toLocaleDateFormat } from "@/lib/utils";

const defaultColumns: ColumnDef<Factura>[] = [
    {
        id: 'factura.folio',
        header: 'Folio',
        accessorFn: ({ folio }) => folio
    },
    {
        id: 'factura.fecha_emision',
        header: 'Fecha de emisión',
        accessorFn: ({ fecha_emision }) => toLocaleDateFormat(fecha_emision)
    },
    ArchivoActionsRow<Factura>((row) => row.archivo),
];

const initialState: InitialTableState = {
    columnOrder: ['factura.folio', 'factura.fecha_emision', ...(archivoTableInitialState?.columnOrder ?? [])]
}

export {
    defaultColumns as facturaDefaultTableColumns,
    initialState as facturaInitialTableState
}
