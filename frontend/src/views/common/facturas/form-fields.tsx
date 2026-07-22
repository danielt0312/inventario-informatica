import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import { useState } from "react";
import { Table as FacturaTable } from "./partials/table";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";
import { Field, type FieldProps } from "@/components/composed/field";
import { useStore } from "@tanstack/react-form";
import { FilePreviewWindowGroup } from "@/components/composed/file-preview-window";

export type FacturaField = string | undefined;
export const FacturaField = ({
    label = 'Adjuntar factura',
    ...props
}: FieldProps) => {
    const field = useFieldContext<FacturaField>();
    const [open, setOpen] = useState(false);
    const factura = useStore(field.store, (state) => state.value);

    return (
        <Field
            label={label}
            errors={field.state.meta.errors}
            {...props}
        >
            <FilePreviewWindowGroup
                onClick={() => setOpen(true)}
                uuid={factura}
            >
                <PaperclipIcon /> Adjuntar
            </FilePreviewWindowGroup>

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
                                cell: ({ row }) => {
                                    return (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                field.setValue(row.original.uuid);
                                                setOpen(false);
                                            }}
                                        >
                                            <PaperclipIcon /> Adjuntar
                                        </Button>
                                    );
                                }
                            }
                        ]}
                    />
                </DialogContent>
            </Dialog>
        </Field>
    );
}
