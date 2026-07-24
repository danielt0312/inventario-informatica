import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Form, useForm, useFacturaCreateFormMutation } from "../create/form";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QueryDataTable } from "@/components/custom/query-datatable";
import { getFacturaDefaultColumns } from "./table-cols";

export function FacturaTable() {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    const useDialogFormMutation = () => useFacturaCreateFormMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['facturas'] });
            setIsOpen(false);
        }
    });

    const useDialogForm = () => useForm(useDialogFormMutation);

    return (
        <QueryDataTable
            queryKey={['facturas']}
            url="api/facturas"
            columns={getFacturaDefaultColumns()}
            actionBar={(
                <>
                    <Button size="sm" onClick={() => setIsOpen(true)}>
                        <PlusCircle /> Crear
                    </Button>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Crear Factura</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Creación de factura
                                </DialogDescription>
                            </DialogHeader>

                            <Form useFormHook={useDialogForm} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        />
    );
}
