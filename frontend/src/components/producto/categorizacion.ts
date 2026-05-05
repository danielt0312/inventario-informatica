import api from "@/lib/axios"
import type { TCatalogo } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

type ID = number | null;

export const useCategoriaQuery = () => useQuery({
    queryKey: ['producto_categorias'],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_categorias')
        .then(r => r.data.data)
});

export const useTipoQuery = (
    categoria_id: ID
) => useQuery({
    queryKey: ['producto_tipos', categoria_id],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_tipos', {
        params: {
            categoria_id
        }
    }).then(r => r.data.data),
    enabled: !!categoria_id
});

export const useMarcaQuery = (
    tipo_id: ID
) => useQuery({
    queryKey: ['producto_marcas', tipo_id],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/producto_marcas', {
        params: {
            tipo_id
        }
    }).then(r => r.data.data),
    enabled: !!tipo_id
});

export const useProductoQuery = (
    tipo_id: ID,
    marca_id: ID
) => useQuery({
    queryKey: ['productos', tipo_id, marca_id],
    queryFn: () => api.get<{ data: TCatalogo[] }>('api/productos', {
        params: {
            tipo_id,
            marca_id
        }
    }).then(r => r.data.data),
    enabled: !!tipo_id && !!marca_id
})
