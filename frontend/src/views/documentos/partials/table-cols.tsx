import type { Documento } from "@/types/documentos";
import { getArchivoDefaultColumns } from "@/views/common/archivos/partials/table-cols";
import type { ColumnDef, InitialTableState } from "@tanstack/react-table";

const getDefaultColumns = (): ColumnDef<Documento>[] => [
    ...getArchivoDefaultColumns<Documento>((row) => row),
    {
        header: 'Tipo de Documento',
        accessorKey: 'documento'
    }
];

const initialTableState: InitialTableState = {
    columnOrder: ['documento', 'archivo.nombre', 'archivo.fecha_subida', 'archivo.actions']
}

export { getDefaultColumns as documentoGetDefaultColumns, initialTableState as documentoinitialTableState }
