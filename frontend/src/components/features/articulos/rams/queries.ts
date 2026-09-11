import api from "@/lib/axios";
import type { RamCapacidad, RamVelocidad, RamTipo } from "@/types/articulos/rams";
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

const velocidadOptions = queryOptions({
    queryKey: ['ram_velocidades'],
    queryFn: () => api.get<TResponse<RamVelocidad[]>>('api/ram_velocidades')
        .then(r => r.data.data)
});

export {
    tipoOptions as ramTipoQueryOptions,
    capacidadOptions as ramCapacidadQueryOptions,
    velocidadOptions as ramVelocidadQueryOptions,
}
