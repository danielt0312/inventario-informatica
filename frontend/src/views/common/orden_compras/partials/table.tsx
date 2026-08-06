import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CreateOrdenCompraForm, useCreateOrdenCompraForm, useCreateOrdenCompraFormMutation } from "../create/form";
import { ordenCompraDefaultColumns, ordenCompraInitialTableState } from "./table-cols";
import { QueryDataTable, type QueryDataTableProps } from "@/components/ui/query-datatable";
import type { OrdenCompra } from "@/types/orden_compras";
import { useFilePreviewWindowMutation } from "@/hooks/use-file-preview-window-mutation";

export function OrdenCompraTable({
    columns = [],
    tableOptions,
    ...props
}: Omit<QueryDataTableProps<OrdenCompra>, 'queryKey' | 'url'>) {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    const useCreateFormMutation = () => useCreateOrdenCompraFormMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orden_compras'] });
            setIsOpen(false);
        }
    });
    const { mutate, isPending: isPreviewing } = useFilePreviewWindowMutation();

    const createForm = () => useCreateOrdenCompraForm(useCreateFormMutation);

    return (
        <QueryDataTable
            queryKey={['orden_compras']}
            url="api/orden_compras"
            columns={[
                ...ordenCompraDefaultColumns,
                ...columns,
            ]}
            actionBar={(
                <>
                    <Button size="sm" onClick={() => setIsOpen(true)}>
                        <PlusCircle /> Registrar
                    </Button>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent className="min-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Registrar Orden de Compra</DialogTitle>
                                <DialogDescription className="sr-only">
                                    Registrar nueva orden de compra
                                </DialogDescription>
                            </DialogHeader>

                            <CreateOrdenCompraForm useFormHook={createForm} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
            tableOptions={{
                meta: {
                    previewFile: (uuid, title) => mutate({ uuid, title }),
                    isPreviewing,
                    ...tableOptions?.meta,
                },
                initialState: ordenCompraInitialTableState,
                ...tableOptions,
            }}
            {...props}
        />
    );
}
