import api from "@/lib/axios";
import type { Area } from "@/types/externos";
import type { TResponse } from "@/types/generics";
import { queryOptions } from "@tanstack/react-query";

const options = queryOptions({
    queryKey: ['areas'],
    queryFn: () => api.get<TResponse<Area[]>>('api/areas')
        .then(r => r.data.data),
});

export {
    options as areasQueryOptions
}
