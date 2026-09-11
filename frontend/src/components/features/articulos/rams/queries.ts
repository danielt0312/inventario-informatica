import api from "@/lib/axios";
import type { RamCapacidad, RamFrecuencia, RamTipo } from "@/types/articulos/rams";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const tipoOptions = queryOptions({
    queryKey: ['ram_tipos'],
    queryFn: () => api.get<TResponse<RamTipo[]>>('api/ram_tipos')
        .then(r => r.data.data)
});

const capacidadOptions = queryOptions({
    queryKey: ['ram_capacidades'],
    queryFn: () => api.get<TResponse<RamCapacidad[]>>('api/ram_capacidades')
        .then(r => r.data.data)
});

const frecuenciaOptions = queryOptions({
    queryKey: ['ram_frecuencia'],
    queryFn: () => api.get<TResponse<RamFrecuencia[]>>('api/ram_frecuencia')
        .then(r => r.data.data)
});

export {
    tipoOptions as ramTipoQueryOptions,
    capacidadOptions as ramCapacidadQueryOptions,
    frecuenciaOptions as ramFrecueciaQueryOptions,
}
