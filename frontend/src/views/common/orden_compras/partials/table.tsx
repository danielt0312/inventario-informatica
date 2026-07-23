import {
    PrimitiveTable as DocumentoPrimitiveTable,
    type PrimitiveTableProps as DocumentoPrimitiveTableProps
} from "@/views/documentos/partials/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CreateOrdenCompraForm, useCreateOrdenCompraForm, useCreateOrdenCompraFormMutation } from "../create/form";
import { defaultColumns } from "./table-cols";
import type { OrdenCompra } from "@/types/orden_compras";

export function OrdenCompraTable({
    columns = [],
    ...props
}: Omit<DocumentoPrimitiveTableProps<OrdenCompra>, 'queryKey' | 'url' | 'actionBar'>) {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    const useCreateFormMutation = () => useCreateOrdenCompraFormMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orden_compras'] });
            setIsOpen(false);
        }
    });

    const createForm = () => useCreateOrdenCompraForm(useCreateFormMutation);

    return (
        <DocumentoPrimitiveTable
            {...props}
            queryKey={['orden_compras']}
            url="api/orden_compras"
            columns={[
                ...columns,
                ...defaultColumns
            ]}
            actionBar={(
                <>
                    <Button size="sm" onClick={() => setIsOpen(true)}>
                        <PlusCircle /> Crear
                    </Button>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent className="min-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Crear Orden de Compra</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Creación de Orden de Compra
                                </DialogDescription>
                            </DialogHeader>

                            <CreateOrdenCompraForm useFormHook={createForm} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        />
    );
}
