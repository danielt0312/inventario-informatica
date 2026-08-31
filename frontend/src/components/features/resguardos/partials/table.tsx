import { Route as RouteCreate } from "@/routes/_auth/resguardos/crear";
import { QueryDataTable } from "@/components/ui/query-datatable";
import { resguardoTableColumns } from "./table-cols";
import { RouterButton } from "@/components/ui/router-button";
import { CirclePlusIcon } from "lucide-react";


function Table() {
    return (
        <QueryDataTable
            url='api/resguardos'
            queryKey={['resguardos']}
            columns={resguardoTableColumns}
            actionBar={(
                <RouterButton to={RouteCreate.to} size="sm" >
                    <CirclePlusIcon/> Crear
                </RouterButton>
            )}
        />
    );
}

export { Table as ResguardoTable }
