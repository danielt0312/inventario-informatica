import api from "@/lib/axios"
import type { CatalogoListResponse, TCatalogo } from "@/lib/types"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

type Option = string[];
type OmitQueryOptions<TData = TCatalogo[]> = Omit<
    UseQueryOptions<TCatalogo[], Error, TData>,
    'queryKey' | 'queryFn'
>;

export const useCategoriaQuery = <TData = TCatalogo[]>(
    params?: OmitQueryOptions<TData>
) => useQuery({
    ...params,
    queryKey: ['producto_categorias'],
    queryFn: () => api.get<CatalogoListResponse>('api/producto_categorias')
        .then(r => r.data.data)
});

export const useTipoQuery = <TData = TCatalogo[]>({
    categorias,
    ...params
}: OmitQueryOptions<TData> & {
    categorias: Option
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
}: OmitQueryOptions<TData> & {
    tipos: Option
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
}: OmitQueryOptions<TData> & {
    tipos: Option,
    marcas: Option
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
