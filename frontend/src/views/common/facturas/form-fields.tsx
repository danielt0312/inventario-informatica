import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import { useState } from "react";
import { FacturaTable as FacturaTable } from "./partials/table";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";
import { FileViewerSelectorField } from "@/components/composed/@tanstack/form/file-viewer-selector-field";

export type FacturaField = FileViewerSelectorField;
export const FacturaField = ({
    label = 'Adjuntar factura',
    ...props
}: React.ComponentProps<typeof FileViewerSelectorField>) => {
    const field = useFieldContext<FacturaField>();
    const [open, setOpen] = useState(false);

    return (
        <>
            <FileViewerSelectorField
                selector={{
                    onClick: () => setOpen(true)
                }}
                label={label}
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
                                            field.setValue(row.original.archivo.uuid);
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
