import {
    PrimitiveTable as DocumentoPrimitiveTable,
    type PrimitiveTableProps as DocumentoPrimitiveTableProps
} from "@/views/documentos/partials/table";

import type { Factura } from "@/types/documentos";
import { getDefaultColumns } from "./table-cols";

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
        />
    );
}
