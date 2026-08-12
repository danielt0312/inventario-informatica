import type { Documento } from "@/types/documentos";
import { archivoTableInitialState, getArchivoDefaultColumns } from "@/components/features/archivos/table-cols";
import type { ColumnDef, InitialTableState } from "@tanstack/react-table";

const getDefaultColumns = (): ColumnDef<Documento>[] => [
    ...getArchivoDefaultColumns<Documento>((row) => row),
    {
        header: 'Tipo de Documento',
        accessorKey: 'documento'
    }
];

const initialTableState: InitialTableState = {
    columnOrder: ['documento', ...(archivoTableInitialState?.columnOrder ?? [])]
}

export { getDefaultColumns as documentoGetDefaultColumns, initialTableState as documentoinitialTableState }
