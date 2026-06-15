import api from "@/lib/axios"
import type { CatalogoListResponse, OmitQueryOptions } from "@/types/generics";
import type { TCatalogo } from "@/types/generics";
import { useQuery } from "@tanstack/react-query"

export const useCategoriaQuery = <TData = TCatalogo[]>(
    params?: OmitQueryOptions<TCatalogo[], Error, TData>
) => useQuery({
    ...params,
    queryKey: ['producto_categorias'],
    queryFn: () => api.get<CatalogoListResponse>('api/producto_categorias')
        .then(r => r.data.data)
});

export const useTipoQuery = <TData = TCatalogo[]>({
    categorias,
    ...params
}: OmitQueryOptions<TCatalogo[], Error, TData> & {
    categorias: number[]
}) => useQuery({
    ...params,
    queryKey: ['producto_tipos', categorias],
    queryFn: () => api.get<CatalogoListResponse>('api/producto_tipos', {
        params: {
            categorias
        }
    }).then(r => r.data.data)
});

export const useMarcaQuery = <TData = TCatalogo[]>({
    tipos,
    ...params
}: OmitQueryOptions<TCatalogo[], Error, TData> & {
    tipos: number[]
}) => useQuery({
    ...params,
    queryKey: ['producto_marcas', tipos],
    queryFn: () => api.get<CatalogoListResponse>('api/producto_marcas', {
        params: {
            tipos
        }
    }).then(r => r.data.data)
});

export const useProductoQuery = <TData = TCatalogo[]>({
    tipos,
    marcas,
    ...params
}: OmitQueryOptions<TCatalogo[], Error, TData> & {
    tipos: number[],
    marcas: number[]
}
) => useQuery({
    ...params,
    queryKey: ['productos', tipos, marcas],
    queryFn: () => api.get<CatalogoListResponse>('api/productos', {
        params: {
            tipos,
            marcas
        }
    }).then(r => r.data.data)
});
