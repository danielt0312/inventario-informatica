import {
    PrimitiveTable as DocumentoPrimitiveTable,
    type PrimitiveTableProps as DocumentoPrimitiveTableProps
} from "@/views/documentos/partials/table";
import type { Factura } from "@/types/documentos";
import { getDefaultColumns } from "./table-cols";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Form, useForm, useFacturaCreateFormMutation } from "../create/form";
import type { TResponse } from "@/types/generics";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export interface TableProps<TData extends Factura = Factura>
    extends Omit<
        DocumentoPrimitiveTableProps<TData>,
        'queryKey' | 'url' | 'actionBar'
    > { }

export function Table<TData extends Factura = Factura>({
    columns = [],
    ...props
}: TableProps<TData>) {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    const useDialogFormMutation = <R extends TResponse<Factura>, P extends FormData>() => useFacturaCreateFormMutation<R, P>({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['facturas'] });
            setIsOpen(false);
        }
    });

    const useDialogForm = () => useForm({
        useMutationHook: useDialogFormMutation
    });

    return (
        <DocumentoPrimitiveTable<TData>
            {...props}
            queryKey={['facturas']}
            url="api/facturas"
            columns={[
                ...columns,
                ...getDefaultColumns<TData>()
            ]}
            actionBar={(
                <>
                    <Button size="sm" onClick={() => setIsOpen(true)}>
                        <PlusCircle /> Crear
                    </Button>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Creación de Factura</DialogTitle>
                            </DialogHeader>

                            <Form useFormHook={useDialogForm} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        />
    );
}
