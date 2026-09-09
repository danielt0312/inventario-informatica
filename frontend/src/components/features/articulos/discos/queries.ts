import api from "@/lib/axios";
import type { DiscoTipo } from "@/types/articulos/discos";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const tipoOptions = queryOptions({
    queryKey: ['disco_tipos'],
    queryFn: () => api.get<TResponse<DiscoTipo[]>>('api/disco_tipos')
        .then(r => r.data.data)
});

export {
    tipoOptions as discoTipoQueryOptions
}
