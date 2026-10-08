import api from "@/lib/axios";
import type { Dictamen } from "@/types/dictamenes";
import type { TResponse } from "@/types/generics";
import { mutationOptions } from "@tanstack/react-query";

export const cancelarDictamenMutationOptions = (dictamen: Dictamen) => mutationOptions({
    mutationFn: () => api.post<TResponse<Dictamen>>(`api/dictamenes/${dictamen.uuid}/cancelar`)
        .then(r => r.data.data)
});
