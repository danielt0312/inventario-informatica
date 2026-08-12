import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaperclipIcon } from "lucide-react";
import { useFieldContext } from "@/components/ui/form-context";
import { OrdenCompraTable } from "./partials/table";
import { ordenCompraInitialTableState } from "./partials/table-cols";
import { ArchivoAttachmentField, useArchivoAttachmentFieldState } from "@/components/features/archivos/attachment-field";
import React from "react";
import type { OrdenCompra } from "@/types/orden_compras";

export type OrdenCompraFieldType = number | undefined;
export const OrdenCompraField = ({
    value,
    onValueChange,
    label = 'Adjuntar orden de compra',
    ...props
}: Omit<React.ComponentProps<typeof ArchivoAttachmentField>, 'onSelect'> & {
    onValueChange?: (orden: OrdenCompra) => void;
}) => {
    const field = useFieldContext<OrdenCompraFieldType>();
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
                        columns={[{
                            id: 'selector',
                            cell: ({ row }) => {
                                const { original: ordenCompra } = row;

                                return (
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setArchivo(ordenCompra.archivo);
                                            field.setValue(ordenCompra.id);
                                            setOpen(false);
                                            onValueChange?.(ordenCompra);
                                        }}
                                    >
                                        <PaperclipIcon /> Adjuntar
                                    </Button>
                                );
                            }
                        }]}
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
