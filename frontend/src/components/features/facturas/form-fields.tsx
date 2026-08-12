import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import { FacturaTable as FacturaTable } from "./partials/table";
import { useFieldContext } from "@/components/ui/form-context";
import { ArchivoAttachmentField, useArchivoAttachmentFieldState, type ArchivoAttachmentFieldType } from "@/components/features/archivos/attachment-field";
import { facturaTableInitialState } from "./partials/table-cols";
import React from "react";

export type FacturaFieldType = ArchivoAttachmentFieldType;
export const FacturaField = ({
    value,
    ordenCompra,
    label = 'Adjuntar factura',
    ...props
}: React.ComponentProps<typeof ArchivoAttachmentField> & {
    ordenCompra?: ArchivoAttachmentFieldType;
}) => {
    const field = useFieldContext<FacturaFieldType>();
    const [open, setOpen] = React.useState(false);
    const [archivo, setArchivo] = useArchivoAttachmentFieldState(value);

    return (
        <>
            <ArchivoAttachmentField
                label={label}
                value={archivo}
                onAttachmentClick={() => setOpen(true)}
                {...props}
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="min-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Facturas</DialogTitle>
                        <DialogDescription className="sr-only">
                            Selección de factura
                        </DialogDescription>
                    </DialogHeader>

                    <FacturaTable
                        ordenCompra={ordenCompra}
                        columns={[{
                            id: 'factura.selector',
                            cell: ({ row }) => (
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        const archivo = row.original.archivo;
                                        setArchivo(archivo);
                                        field.setValue(archivo.uuid);
                                        setOpen(false);
                                    }}
                                >
                                    <PaperclipIcon /> Adjuntar
                                </Button>
                            )
                        }]}
                        tableOptions={{
                            initialState: {
                                ...facturaTableInitialState,
                                columnOrder: ['factura.selector', ...(facturaTableInitialState.columnOrder ?? [])]
                            }
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
