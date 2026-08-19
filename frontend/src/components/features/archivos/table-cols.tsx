import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toLocaleDateFormat } from "@/lib/utils";
import type { Archivo } from "@/types/documentos";
import type { TRowDataAccessFn } from "@/types/generics";
import type { ColumnDef, InitialTableState, TableMeta } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";

type RowDataAccessFn<TRowData> = TRowDataAccessFn<TRowData, Archivo>;

const NombreRow = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'nombre',
    header: 'Nombre del Archivo',
    accessorFn: (row) => getRowData(row).nombre
});

const FechaSubidaRow = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData> => ({
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
        <Tooltip>
            <TooltipContent>Ver Documento</TooltipContent>
            <TooltipTrigger asChild>
                <Button
                    disabled={meta?.isPreviewing}
                    onClick={() => meta?.previewFile?.(uuid, nombre)}
                    variant="outline"
                    size="icon"
                >
                    <EyeIcon />
                </Button>
            </TooltipTrigger>
        </Tooltip>
    );
}

const ActionRow = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'actions',
    cell: ({ row, table }) => (
        <PreviewActionRow meta={table.options.meta} archivo={getRowData(row.original)} />
    ),
});

const getDefaultColumns = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData>[] => ([
    NombreRow(getRowData),
    FechaSubidaRow(getRowData),
    ActionRow(getRowData)
]);

const initialState: InitialTableState = {
    columnOrder: ['nombre', 'fecha_subida', 'actions'],
}

export { type RowDataAccessFn as ArchivoRowDataAccessFn, getDefaultColumns as getArchivoDefaultColumns, NombreRow as ArchivoNombreRow, FechaSubidaRow as ArchivoFechaSubidaRow, ActionRow as ArchivoActionRow, PreviewActionRow as ArchivoPreviewActionRow, initialState as archivoTableInitialState }
