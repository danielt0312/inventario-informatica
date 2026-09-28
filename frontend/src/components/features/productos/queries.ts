import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { ProductoMarca, ProductoTipoWithCategoria, ProductoVarianteGenerica } from "@/types/productos";
import { queryOptions } from "@tanstack/react-query";
import type { ProductoTipoFieldType } from "./tipo-field";

const tipoOptions = queryOptions({
    queryKey: ['producto_tipos', ['categorias']],
    queryFn: () => api.get<TResponse<ProductoTipoWithCategoria[]>>('api/producto_tipos', {
        params: {
            include: 'categoria'
        }
    }).then(r => r.data.data),
});

const marcaOptions = queryOptions({
    queryKey: ['producto_marcas'],
    queryFn: () => api.get<TResponse<ProductoMarca[]>>('api/producto_marcas')
        .then(r => r.data.data),
});

const options = (tipoId: ProductoTipoFieldType) => queryOptions({
    queryKey: ['productos', tipoId],
    queryFn: () => api.get<TResponse<ProductoVarianteGenerica[]>>('api/productos', {
        params: {
            filter: {
                producto_tipo_id: tipoId,
            }
        }
    }).then(r => r.data.data),
});

export {
    tipoOptions as productoTipoQueryOptions,
    marcaOptions as productoMarcaQueryOptions,
    options as productoQueryOptions,
}
