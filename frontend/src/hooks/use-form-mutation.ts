import api from "@/lib/axios";
import { handleFormValidationError } from "@/lib/utils";
import type { LaravelValidationErrors } from "@/types/generics";
import type { AnyFormApi } from "@tanstack/react-form";
import { QueryClient, useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface FormMutationFunction<TPayload = any> {
    data: TPayload;
    formApi?: AnyFormApi;
}

export type FormMutationMethod = 'POST' | 'PUT' | 'PATCH';
export interface FormMutation<TResponse = any, TPayload = any, TError = LaravelValidationErrors>
    extends Omit<
        UseMutationOptions<
            AxiosResponse<TResponse>,
            AxiosError<TError>,
            FormMutationFunction<TPayload>
        >,
        'mutationFn'
    > {
    url: string;
    method?: FormMutationMethod;
    axiosConfig?: Omit<AxiosRequestConfig<TPayload>, 'url' | 'data' | 'method'>;
    toFormData?: (data: TPayload) => FormData;
}

export function useFormMutation<TResponse = any, TPayload = any, TError = LaravelValidationErrors>({
    url,
    axiosConfig,
    onError,
    toFormData,
    method = 'POST',
    ...props
}: FormMutation<TResponse, TPayload, TError>, queryClient?: QueryClient) {
    return useMutation({
        ...props,
        mutationFn: ({ data }: FormMutationFunction<TPayload>) => {
            const payload = toFormData ? toFormData(data) : data;

            if (payload instanceof FormData) {
                payload.append('_method', method);
                return api.post<TResponse, AxiosResponse<TResponse, TPayload>>(url, payload, axiosConfig);
            }

            return api.request<TResponse, AxiosResponse<TResponse, TPayload>>({
                url,
                method,
                data: payload,
                ...axiosConfig
            });
        },
        onError: (error, variables, onMutateResult, context) => {
            if (variables.formApi !== undefined) handleFormValidationError(error, variables.formApi);
            onError?.(error, variables, onMutateResult, context);
        },
    }, queryClient);
}
