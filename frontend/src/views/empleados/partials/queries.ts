import api from "@/lib/axios";
import type { OmitQueryOptions, TResponse } from "@/types/generics";
import { useQuery } from "@tanstack/react-query";

export type Empleado = {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre_completo: string;
}

export type Response = TResponse<Empleado[]>;

export function useEmpleadoQuery<TData = Empleado[]>({
    adscripciones,
    ...params
}: OmitQueryOptions<Empleado[], Error, TData> & {
    adscripciones: number[]
}) {
    return useQuery({
        ...params,
        queryKey: ['empleados', adscripciones],
        queryFn: () => api.get<Response>('api/empleados', {
            params: {
                adscripciones
            }
        }).then(r => r.data.data)
    })
};
