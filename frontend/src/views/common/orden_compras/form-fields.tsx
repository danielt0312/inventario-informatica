import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import React from "react";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";
import { OrdenCompraTable } from "./partials/table";
import { ordenCompraInitialTableState } from "./partials/table-cols";
import { ArchivoAttachmentField, useArchivoAttachmentFieldState, type ArchivoAttachmentFieldType } from "@/components/features/archivos/attachment-field";

export type OrdenCompraField = ArchivoAttachmentFieldType;
export const OrdenCompraField = ({
    value,
    label = 'Adjuntar orden de compra',
    ...props
}: React.ComponentProps<typeof ArchivoAttachmentField>) => {
    const field = useFieldContext<OrdenCompraField>();
    const [open, setOpen] = React.useState(false);
    const [archivo, setArchivo] = useArchivoAttachmentFieldState(value);

    return (
        <>
            <ArchivoAttachmentField
                label={label}
                onAttachmentClick={() => setOpen(true)}
                value={archivo}
                {...props}
            />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="min-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Ordenes de Compra</DialogTitle>
                        <DialogDescription className="sr-only">
                            Selección de órden de compra
                        </DialogDescription>
                    </DialogHeader>

                    <OrdenCompraTable
                        columns={[
                            {
                                id: 'selector',
                                cell: ({ row }) => {
                                    return (
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
                                    );
                                }
                            }
                        ]}
                        tableOptions={{
                            initialState: {
                                ...ordenCompraInitialTableState,
                                columnOrder: ['selector', ...ordenCompraInitialTableState.columnOrder ?? []],
                            }
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
