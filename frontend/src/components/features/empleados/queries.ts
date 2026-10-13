import { queryOptions } from "@tanstack/react-query";
import type { AreaFieldType } from "../areas/field";
import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";
import api from "@/lib/axios";

const options = (areaId: AreaFieldType) => queryOptions({
    queryKey: ['empleados', areaId],
    queryFn: () => api.get<TResponse<Empleado[]>>('api/empleados', {
        params: {
            filter: {
                areas: areaId
            }
        }
    }).then(r => r.data.data),
})

export {
    options as empleadosQueryOptions
}
