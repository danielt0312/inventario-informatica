import api from "@/lib/axios";
import type { Archivo } from "@/types/documentos";
import type { TResponse } from "@/types/generics";
import * as q from "@tanstack/react-query";

type Uuid = Archivo['uuid'] | undefined;
type UseQueryOptions = Omit<q.UseQueryOptions<Archivo, Error, Archivo, Uuid[]>, 'queryKey' | 'queryFn'>;
const useQuery = (
    uuid?: Uuid,
    options?: UseQueryOptions
) => q.useQuery({
    ...options,
    queryKey: ['archivo', uuid],
    queryFn: () => api.get<TResponse<Archivo>>(`archivos/${uuid}`)
        .then(r => r.data.data),
    enabled: uuid !== undefined
});

export { useQuery as useArchivoQuery, type UseQueryOptions as UseArchivoQueryOptions, type Uuid as ArchivoUuid }
