import api from "@/lib/axios";
import type { CamaraTipo } from "@/types/camaras";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const tipoOptions = queryOptions({
    queryKey: ['camara_tipos'],
    queryFn: () => api.get<TResponse<CamaraTipo[]>>('api/camara_tipos')
        .then(r => r.data.data)
});

export {
    tipoOptions as camaraTipoQueryOptions,
}
