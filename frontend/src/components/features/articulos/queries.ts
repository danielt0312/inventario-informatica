import api from "@/lib/axios";
import type { ArticuloEstado } from "@/types/articulos";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const estadoOptions = queryOptions({
    queryKey: ['articulos_estados'],
    queryFn: () => api.get<TResponse<ArticuloEstado[]>>('api/articulo_estados')
        .then(r => r.data.data)
});

export {
    estadoOptions as articuloEstadoQueryOptions
}
