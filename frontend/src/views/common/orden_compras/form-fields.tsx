import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import { useState } from "react";
import { useFieldContext } from "@/components/composed/@tanstack/form/form";
import { OrdenCompraTable } from "./partials/table";
import { ordenCompraInitialTableState } from "./partials/table-cols";
import { FileViewerSelectorField } from "@/components/composed/@tanstack/form/file-viewer-selector-field";

export type OrdenCompraField = FileViewerSelectorField;
export const OrdenCompraField = ({
    label = 'Adjuntar orden de compra',
    ...props
}: React.ComponentProps<typeof FileViewerSelectorField>) => {
    const field = useFieldContext<OrdenCompraField>();
    const [open, setOpen] = useState(false);

    return (
        <>
            <FileViewerSelectorField
                label={label}
                selector={{
                    onClick: () => setOpen(true)
                }}
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
                                                field.setValue(row.original.archivo.uuid);
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
