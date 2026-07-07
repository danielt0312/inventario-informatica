import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { SurtirDictamen } from "@/types/dictamenes";

export const useSurtirMutation = (dictamen: SurtirDictamen, options?: UseMutationOptions) => useMutation({
    ...options,
    mutationFn: () => api.post(`api/dictamenes/${dictamen.uuid}/surtir`),
    onSuccess: (data, variables, onMutateResult, context) => {
        context.client.invalidateQueries({ queryKey: ['dictamenes'] });
        options?.onSuccess?.(data, variables, onMutateResult, context);
    }
});

