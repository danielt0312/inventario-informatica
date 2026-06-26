import api from "@/lib/axios";
import { handleFormValidationError } from "@/lib/utils";
import type { AnyFormApi } from "@tanstack/react-form";
import { QueryClient, useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface FormMutationFunction<TPayload> {
    data: TPayload;
    formApi: AnyFormApi;
}

export type FormMutationMethod = 'POST' | 'PUT' | 'PATCH';
export interface FormMutation<TResponse = any, TPayload = any>
    extends Omit<
        UseMutationOptions<
            AxiosResponse<TResponse>,
            any,
            FormMutationFunction<TPayload>
        >,
        'mutationFn'
    > {
    url: string;
    method?: FormMutationMethod;
    axiosConfig?: AxiosRequestConfig<TPayload>;
}

export function useFormMutation<TResponse = any, TPayload = any>({
    url,
    axiosConfig,
    onError,
    method = 'POST',
    ...props
}: FormMutation<TResponse, TPayload>, queryClient?: QueryClient) {
    return useMutation({
        ...props,
        mutationFn: ({ data }: FormMutationFunction<TPayload>) => {
            if (data instanceof FormData && (method === 'PUT' || method === 'PATCH')) {
                data.append('_method', method);
                return api.post<TResponse>(url, data, axiosConfig);
            }

            return api.request<TResponse>({
                url,
                method,
                data,
                ...axiosConfig
            });
        },
        onError: (error, variables, onMutateResult, context) => {
            handleFormValidationError(error, variables.formApi);
            if (onError) onError(error, variables, onMutateResult, context);
        },
    }, queryClient);
}
