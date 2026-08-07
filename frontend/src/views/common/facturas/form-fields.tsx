import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import { useState } from "react";
import { FacturaTable as FacturaTable } from "./partials/table";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";
import { ArchivoAttachmentField, useArchivoAttachmentFieldState, type ArchivoAttachmentFieldType } from "@/components/features/archivos/attachment-field";

export type FacturaField = ArchivoAttachmentFieldType;
export const FacturaField = ({
    value,
    label = 'Adjuntar factura',
    ...props
}: React.ComponentProps<typeof ArchivoAttachmentField>) => {
    const field = useFieldContext<FacturaField>();
    const [open, setOpen] = useState(false);
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
                        columns={[
                            {
                                id: 'selector',
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
                            }
                        ]}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
