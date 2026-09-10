import api from "@/lib/axios";
import type { DiscoCapacidad, DiscoInterfaz, DiscoTipo } from "@/types/articulos/discos";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const tipoOptions = queryOptions({
    queryKey: ['disco_tipos'],
    queryFn: () => api.get<TResponse<DiscoTipo[]>>('api/disco_tipos')
        .then(r => r.data.data)
});

const capacidadOptions = queryOptions({
    queryKey: ['disco_capacidades'],
    queryFn: () => api.get<TResponse<DiscoCapacidad[]>>('api/disco_capacidades')
        .then(r => r.data.data)
});

const interfazOptions = queryOptions({
    queryKey: ['disco_interfaces'],
    queryFn: () => api.get<TResponse<DiscoInterfaz[]>>('api/disco_interfaces')
        .then(r => r.data.data)
});

export {
    tipoOptions as discoTipoQueryOptions,
    capacidadOptions as discoCapacidadQueryOptions,
    interfazOptions as discoInterfazQueryOptions,
}
