import type { Factura } from "@/types/documentos"
import { getArchivoDefaultColumns } from "../../archivos/partials/table-cols";
import type { ColumnDef } from "@tanstack/react-table";


export const getFacturaDefaultColumns = (): ColumnDef<Factura>[] => [
    ...getArchivoDefaultColumns<Factura>((row) => row.archivo),
    {
        header: 'Fecha de emisión',
        accessorKey: 'fecha_emision',
    }
];
