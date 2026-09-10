import type { Archivo } from "@/types/documentos";
import type { RowDataAccessorFn } from "@/types/generics";
import type { ColumnDef, InitialTableState, TableMeta } from "@tanstack/react-table";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { toLocaleDateFormat } from "@/lib/utils";
import { FileTextIcon } from "lucide-react";

type AccessorFn<TRowData> = RowDataAccessorFn<TRowData, Archivo>;

const NombreRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'nombre',
    header: 'Nombre del Archivo',
    accessorFn: (row) => getRowData(row).nombre
});

const FechaSubidaRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'fecha_subida',
    header: 'Fecha de Subida',
    accessorFn: (row) => toLocaleDateFormat(getRowData(row).created_at, { hour: '2-digit' })
});

function PreviewActionRow<TRowData>({
    archivo,
    meta,
}: {
    archivo: Archivo,
    meta?: TableMeta<TRowData>;
}) {
    const { uuid, nombre } = archivo;

    return (
        <TooltipButton
            tooltip={{ message: "Ver documento" }}
            disabled={meta?.isPreviewing}
            onClick={() => meta?.previewFile?.(uuid, nombre)}
            variant="outline"
            size="icon"
        >
            <FileTextIcon />
        </TooltipButton>
    );
}

const ActionRow = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'actions',
    cell: ({ row, table }) => (
        <PreviewActionRow meta={table.options.meta} archivo={getRowData(row.original)} />
    ),
});

const getDefaultColumns = <TRowData,>(getRowData: AccessorFn<TRowData>): ColumnDef<TRowData>[] => ([
    NombreRow(getRowData),
    FechaSubidaRow(getRowData),
    ActionRow(getRowData)
]);

const initialState: InitialTableState = {
    columnOrder: ['nombre', 'fecha_subida', 'actions'],
}

export { type AccessorFn as ArchivoRowDataAccessFn, getDefaultColumns as getArchivoDefaultColumns, NombreRow as ArchivoNombreRow, FechaSubidaRow as ArchivoFechaSubidaRow, ActionRow as ArchivoActionRow, PreviewActionRow as ArchivoPreviewActionRow, initialState as archivoTableInitialState }
