import { queryOptions } from "@tanstack/react-query";
import type { AdscripcionFieldType } from "../adscripciones/field";
import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { Empleado } from "@/types/externos";

const options = (adscripcionId: AdscripcionFieldType<false>) => queryOptions({
    queryKey: ['empleados', adscripcionId],
    queryFn: () => api.get<TResponse<Empleado[]>>('api/empleados', {
        params: {
            filter: {
                adscripciones: adscripcionId
            }
        }
    }).then(r => r.data.data),
})

export {
    options as empleadosQueryOptions
}
