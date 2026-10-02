import api from "@/lib/axios";
import type { ComputadoraTipo } from "@/types/computadoras";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const tipoQuery = queryOptions({
    queryKey: ['computadora_tipos'],
    queryFn: () => api.get<TResponse<ComputadoraTipo[]>>('api/computadora_tipos')
        .then(r => r.data.data)
});

export {
    tipoQuery as computadoraTipoQueryOptions
}
