import api from "@/lib/axios";
import type {
    OmitQueryOptions} from "@/lib/types";
import type {
    TCatalogo,
    TResponse
} from "@/types/generics";
import { useQuery } from "@tanstack/react-query";

export type Adscripcion = TCatalogo;

export type Response = TResponse<Adscripcion[]>;

export function useAdscripcionQuery<TData = Adscripcion[]>(
    params: OmitQueryOptions<Adscripcion[], Error, TData>
) {
    return useQuery({
        ...params,
        queryKey: ['adscripciones'],
        queryFn: () => api.get<Response>('api/adscripciones')
            .then(r => r.data.data)
    })
};
