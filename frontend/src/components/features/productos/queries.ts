import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { ProductoCategoriaWithTipos } from "@/types/productos";
import { queryOptions } from "@tanstack/react-query";

const tipoOptions = queryOptions({
    queryKey: ['producto_categorias_tipos'],
    queryFn: () => api.get<TResponse<ProductoCategoriaWithTipos[]>>('api/producto_categorias', {
        params: {
            include: 'tipos'
        }
    }).then(r => r.data.data),
});

export {
    tipoOptions as productoTipoQueryOptions,
}
