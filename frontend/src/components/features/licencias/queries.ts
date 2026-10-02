import api from "@/lib/axios";
import type { LicenciaTipo } from "@/types/licencias";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const tipoOptions = queryOptions({
    queryKey: ['licencia_tipos'],
    queryFn: () => api.get<TResponse<LicenciaTipo[]>>('api/licencia_tipos')
        .then(r => r.data.data)
});

export {
    tipoOptions as licenciaTipoQueryOptions,
}
