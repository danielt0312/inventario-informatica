import api from "@/lib/axios";
import type { Archivo } from "@/types/documentos";
import type { TResponse } from "@/types/generics";
import * as q from "@tanstack/react-query";

type UseQueryOptions = Omit<q.UseQueryOptions<Archivo, Error, Archivo, (string | undefined)[]>, 'queryKey' | 'queryFn'>;
const useQuery = (
    options: UseQueryOptions = {},
    queryClient?: q.QueryClient
) => {
    const { initialData } = options;

    const archivo = typeof initialData === 'function'
        ? initialData()
        : initialData;

    return q.useQuery({
        initialData: archivo,
        queryKey: ['archivo', archivo?.uuid],
        queryFn: () => api.get<TResponse<Archivo>>(`archivos/${archivo?.uuid}`)
            .then(r => r.data.data),
        enabled: !!archivo?.uuid,
        ...options
    }, queryClient);
}

export { useQuery as useArchivoQuery, type UseQueryOptions as UseArchivoQueryOptions }
