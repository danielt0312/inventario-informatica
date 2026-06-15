import {
    PrimitiveTable as DocumentoPrimitiveTable,
    type PrimitiveTableProps as DocumentoPrimitiveTableProps
} from "@/views/documentos/partials/table";

import type { Factura } from "@/types/documentos";
import { getDefaultColumns } from "./table-cols";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Form, useForm, useFormMutation } from "../create/form";
import React from "react";

export interface TableProps<TData extends Factura = Factura>
    extends Omit<
        DocumentoPrimitiveTableProps<TData>,
        'queryKey'| 'url' | 'actionBar'
    > {}

export function Table<TData extends Factura = Factura>({
    columns = [],
    ...props
}: TableProps<TData>) {
    const columnDefinition = [
        ...columns,
        ...getDefaultColumns<TData>()
    ];

    const [isOpen, setIsOpen] = React.useState(false);

    const useDialogFormMutation = () => useFormMutation({
        onSuccess: () => setIsOpen(false)
    });

    const useDialogForm = () => useForm({
        useMutationHook: useDialogFormMutation
    })

    return (
        <DocumentoPrimitiveTable<TData>
            {...props}
            queryKey={['facturas']}
            url="api/facturas"
            columns={columnDefinition}
            actionBar={(
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" onClick={() => setIsOpen(true)}>
                            <PlusCircle /> Crear
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Creación de Factura</DialogTitle>
                        </DialogHeader>

                        <Form useFormHook={useDialogForm} />
                    </DialogContent>
                </Dialog>
            )}
        />
    );
}
