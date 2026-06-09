import api from "@/lib/axios";
import { handleFormValidationError } from "@/lib/utils";
import type { AnyFormApi } from "@tanstack/react-form";
import { QueryClient, useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface FormMutationFunction<TPayload> {
    data: TPayload;
    api: AnyFormApi;
}

export interface FormMutation<TResponse = any, TPayload = any>
    extends Omit<
        UseMutationOptions<
            AxiosResponse<TResponse>,
            any,
            FormMutationFunction<TPayload>
        >,
        'mutationFn' | 'onError'
    > {
    url: string;
    axiosConfig?: AxiosRequestConfig<TResponse>;
}

export function usePostFormMutation<TResponse = any,  TPayload = any>({
    url,
    axiosConfig,
    ...props
}: FormMutation<TResponse, TPayload>, queryClient?: QueryClient) {
    return useMutation({
        mutationFn: ({ data }: FormMutationFunction<TPayload>) => api.post<TResponse>(url, data, axiosConfig),
        onError: (error, { api }) => handleFormValidationError(error, api),
        ...props
    }, queryClient);
}
