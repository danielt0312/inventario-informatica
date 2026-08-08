import type { Factura } from "@/types/documentos";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FacturaCreateForm, facturaCreateFormOptions, useFacturaCreateForm, useFacturaCreateFormMutation } from "../create/form";
import { useQueryClient } from "@tanstack/react-query";
import { QueryDataTable } from "@/components/ui/query-datatable";
import { facturaTableInitialState, getFacturaDefaultColumns } from "./table-cols";
import React from "react";
import { formOptions } from "@tanstack/react-form";
import type { ArchivoAttachmentFieldType } from "@/components/features/archivos/attachment-field";

interface FacturaFieldProps extends Omit<React.ComponentProps<typeof QueryDataTable<Factura>>, 'queryKey' | 'url'> {
    ordenCompra?: ArchivoAttachmentFieldType;
}

export function FacturaTable({
    ordenCompra,
    tableOptions,
    columns = [],
    ...props
}: FacturaFieldProps) {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useFacturaCreateFormMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['facturas'] });
            setIsOpen(false);
        }
    });

    const defaultDialogFormOptions = facturaCreateFormOptions();
    const dialogFormOptions = () => formOptions({
        ...defaultDialogFormOptions,
        defaultValues: {
            ...defaultDialogFormOptions.defaultValues,
            orden_compra_uuid: ordenCompra
        }
    });

    const useDialogForm = () => useFacturaCreateForm(
        useDialogFormMutation,
        dialogFormOptions
    );

    return (
        <QueryDataTable
            queryKey={['facturas', ordenCompra]}
            url="api/facturas"
            columns={[
                ...columns,
                ...getFacturaDefaultColumns()
            ]}
            actionBar={(
                <>
                    <Button size="sm" onClick={() => setIsOpen(true)}>
                        <PlusCircle /> Registrar
                    </Button>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Registrar Factura</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Registrar nueva factura
                                </DialogDescription>
                            </DialogHeader>

                            <FacturaCreateForm useFormHook={useDialogForm} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
            filter={{ ordenCompra }}
            tableOptions={{
                ...tableOptions,
                initialState: {
                    ...facturaTableInitialState,
                    ...tableOptions?.initialState
                }
            }}
            {...props}
        />
    );
}
