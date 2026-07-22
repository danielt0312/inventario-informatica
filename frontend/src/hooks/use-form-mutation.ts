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
    toFormData?: (data: TPayload) => FormData;
}

export function useFormMutation<TResponse = any, TPayload = any>({
    url,
    axiosConfig,
    onError,
    method = 'POST',
    toFormData,
    ...props
}: FormMutation<TResponse, TPayload>, queryClient?: QueryClient) {
    return useMutation({
        ...props,
        mutationFn: ({ data }: FormMutationFunction<TPayload>) => {
            const payload = toFormData ? toFormData(data) : data;

            if (payload instanceof FormData && (method === 'PUT' || method === 'PATCH')) {
                payload.append('_method', method);
                return api.post<TResponse>(url, payload, axiosConfig);
            }

            return api.request<TResponse>({
                url,
                method,
                data: payload,
                ...axiosConfig
            });
        },
        onError: (error, variables, onMutateResult, context) => {
            handleFormValidationError(error, variables.formApi);
            if (onError) onError(error, variables, onMutateResult, context);
        },
    }, queryClient);
}
