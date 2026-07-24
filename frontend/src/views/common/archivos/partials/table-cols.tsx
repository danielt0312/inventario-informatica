import { ActionMenu, ActionMenuItem } from "@/components/composed/action-menu";
import { toLocaleDateFormat } from "@/lib/utils";
import type { Archivo } from "@/types/documentos";
import type { TRowDataAccessFn } from "@/types/generics";
import type { ColumnDef, TableMeta } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";

type RowDataAccessFn<TRowData> = TRowDataAccessFn<TRowData, Archivo>;

const NombreRow = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'archivo.nombre',
    header: 'Nombre del Archivo',
    accessorFn: (row) => getRowData(row).nombre
});

const FechaSubidaRow = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'archivo.fecha_subida',
    header: 'Fecha de Subida',
    accessorFn: (row) => toLocaleDateFormat(getRowData(row).created_at)
});

function PreviewActionRow<TRowData>({
    archivo,
    meta
}: {
    archivo: Archivo,
    meta?: TableMeta<TRowData>;
}) {
    const { uuid, nombre } = archivo;

    return (
        <ActionMenuItem
            disabled={meta?.isPreviewing}
            onClick={() => meta?.previewFile?.(uuid, nombre)}
        >
            <EyeIcon /> Ver documento
        </ActionMenuItem>
    );
}

const ActionRow = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData> => ({
    id: 'archivo.actions',
    cell: ({ row, table }) => (
        <ActionMenu>
            <PreviewActionRow meta={table.options.meta} archivo={getRowData(row.original)} />
        </ActionMenu>
    ),
});

const getDefaultColumns = <TRowData,>(getRowData: RowDataAccessFn<TRowData>): ColumnDef<TRowData>[] => ([
    NombreRow(getRowData),
    FechaSubidaRow(getRowData),
    ActionRow(getRowData)
]);

export { type RowDataAccessFn as ArchivoRowDataAccessFn, getDefaultColumns as getArchivoDefaultColumns, NombreRow as ArchivoNombreRow, FechaSubidaRow as ArchivoFechaSubidaRow, ActionRow as ArchivoActionRow, PreviewActionRow as ArchivoPreviewActionRow }
