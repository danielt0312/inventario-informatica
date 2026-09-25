import api from "@/lib/axios";
import type { Adscripcion } from "@/types/externos";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const options = queryOptions({
    queryKey: ['adscripciones'],
    queryFn: () => api.get<TResponse<Adscripcion[]>>('api/adscripciones')
        .then(r => r.data.data),
});

export {
    options as adscripcionesQueryOptions
}
