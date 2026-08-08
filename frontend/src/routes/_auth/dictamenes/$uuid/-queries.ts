import api from "@/lib/axios";
import type { DetailedDictamen } from "@/types/dictamenes";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

export const detailedDictamenQueryOptions = (uuid: string) => queryOptions({
    queryKey: ['dictamenes', uuid],
    queryFn: () => api.get<TResponse<DetailedDictamen>>(`api/dictamenes/${uuid}`, {
        params: {
            include: 'versionActual.adquisiciones.articulo'
        }
    }).then(r => r.data.data)
})
