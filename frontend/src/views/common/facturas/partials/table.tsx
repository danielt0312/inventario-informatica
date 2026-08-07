import type { Factura } from "@/types/documentos";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Form, useForm, useFacturaCreateFormMutation } from "../create/form";
import { useQueryClient } from "@tanstack/react-query";
import { QueryDataTable } from "@/components/ui/query-datatable";
import { getFacturaDefaultColumns } from "./table-cols";
import React from "react";

interface FacturaFieldProps extends Omit<React.ComponentProps<typeof QueryDataTable<Factura>>, 'queryKey' | 'url'> {
    useFormHook?: typeof useForm;
}

export function FacturaTable({
    columns = [],
    useFormHook = useForm,
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

    const useDialogForm = () => useFormHook(useDialogFormMutation);

    return (
        <QueryDataTable
            queryKey={['facturas']}
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

                            <Form useFormHook={useDialogForm} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
            {...props}
        />
    );
}
