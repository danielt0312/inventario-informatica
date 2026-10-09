import api from "@/lib/axios";
import type { TResponse } from "@/types/generics";
import type { Proveedor } from "@/types/orden_compras";
import { queryOptions } from "@tanstack/react-query";

const options = queryOptions({
    queryKey: ['proveedores'],
    queryFn: () => api.get<TResponse<Proveedor[]>>('api/proveedores')
        .then(r => r.data.data),
});

export {
    options as proveedorQueryOptions
}
