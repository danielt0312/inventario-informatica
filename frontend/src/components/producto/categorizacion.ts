import api from "@/lib/axios"
import type { TCatalogo } from "@/lib/types"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

type Option = number[];

export const useCategoriaQuery = (
    params?: Omit<UseQueryOptions<TCatalogo[]>, 'queryKey' | 'queryFn'>
) => useQuery({
    ...params,
    queryKey: ['producto_categorias'],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_categorias')
        .then(r => r.data.data)
});

export const useTipoQuery = ({
    categorias,
    ...params
}: Omit<UseQueryOptions<TCatalogo[]>, 'queryKey' | 'queryFn'>
    & { categorias: Option }
) => useQuery({
    ...params,
    queryKey: ['producto_tipos', categorias],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_tipos', {
        params: {
            categorias
        }
    }).then(r => r.data.data)
});

export const useMarcaQuery = ({
    tipos,
    ...params
}: Omit<UseQueryOptions<TCatalogo[]>, 'queryKey' | 'queryFn'>
    & { tipos: Option }
) => useQuery({
    ...params,
    queryKey: ['producto_marcas', tipos],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_marcas', {
        params: {
            tipos
        }
    }).then(r => r.data.data)
});

export const useProductoQuery = ({
    tipos,
    marcas,
    ...params
}: Omit<UseQueryOptions<TCatalogo[]>, 'queryKey' | 'queryFn'>
    & { tipos: Option, marcas: Option }
) => useQuery({
    ...params,
    queryKey: ['productos', tipos, marcas],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/productos', {
        params: {
            tipos,
            marcas
        }
    }).then(r => r.data.data)
});
