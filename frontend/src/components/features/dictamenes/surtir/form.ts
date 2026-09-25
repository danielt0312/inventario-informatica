import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { SurtirDictamen, SurtidoParcialDictamen } from "@/types/dictamenes";
import api from "@/lib/axios";

export const useSurtirMutation = (dictamen: SurtirDictamen | SurtidoParcialDictamen, options?: UseMutationOptions) => useMutation({
    ...options,
    mutationFn: () => api.post(`api/dictamenes/${dictamen.uuid}/surtir`),
    onSuccess: (data, variables, onMutateResult, context) => {
        context.client.invalidateQueries({ queryKey: ['dictamenes'] });
        options?.onSuccess?.(data, variables, onMutateResult, context);
    }
});

