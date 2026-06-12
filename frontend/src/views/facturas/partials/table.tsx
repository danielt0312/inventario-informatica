import {
    PrimitiveTable as DocumentoPrimitiveTable,
    type PrimitiveTableProps as DocumentoPrimitiveTableProps
} from "@/views/documentos/partials/table";

import type { Factura } from "@/types/documentos";
import { getDefaultColumns } from "./table-cols";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Form } from "../create/form";

export interface PrimitiveTableProps<TData extends Factura = Factura>
    extends Omit<
        DocumentoPrimitiveTableProps<TData>,
        'queryKey'| 'url'
    > {}

export function Table<TData extends Factura = Factura>({
    columns = [],
    ...props
}: PrimitiveTableProps<TData>) {
    const columnDefinition = [
        ...columns,
        ...getDefaultColumns<TData>()
    ];

    return (
        <DocumentoPrimitiveTable<TData>
            {...props}
            queryKey={['facturas']}
            url="api/facturas"
            columns={columnDefinition}
            actionBar={(
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <PlusCircle /> Crear
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Creación de Factura</DialogTitle>
                        </DialogHeader>

                        <Form />
                    </DialogContent>
                </Dialog>
            )}
        />
    );
}
