import api from "@/lib/axios";
import { handleFormValidationError } from "@/lib/utils";
import type { LaravelValidationErrors } from "@/types/generics";
import type { AnyFormApi } from "@tanstack/react-form";
import { mutationOptions, QueryClient, useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface FormMutationFunction<TPayload = any> {
    data: TPayload;
    formApi?: AnyFormApi;
}

type FormMutationOptions<TResponse = any, TPayload = any, TError = LaravelValidationErrors> = Omit<
    UseMutationOptions<
        AxiosResponse<TResponse>,
        AxiosError<TError>,
        FormMutationFunction<TPayload>
    >,
    'mutationFn'
> & {
    toFormData?: (data: TPayload) => FormData;
    url: string | ((data: TPayload) => string);
    method?: FormMutationMethod;
    axiosConfig?: Omit<AxiosRequestConfig<TPayload>, 'url' | 'data' | 'method'>;
}

export type FormMutationMethod = 'POST' | 'PUT' | 'PATCH';
export interface FormMutation<TResponse = any, TPayload = any, TError = LaravelValidationErrors>
    extends FormMutationOptions<TResponse, TPayload, TError> { }

export function formMutationOptions<TResponse = any, TPayload = any, TError = LaravelValidationErrors>({
    url: urlProp,
    axiosConfig,
    toFormData,
    onError,
    method = 'POST',
    ...options
}: FormMutationOptions<TResponse, TPayload, TError>) {
    return mutationOptions<
        AxiosResponse<TResponse>,
        AxiosError<TError>,
        FormMutationFunction<TPayload>
    >({
        ...options,
        mutationFn: ({ data }) => {
            const payload = toFormData ? toFormData(data) : data;
            const url = typeof urlProp === 'string' ? urlProp : urlProp(data);

            if (payload instanceof FormData) {
                payload.append('_method', method);
                return api.post<TResponse, AxiosResponse<TResponse>>(url, payload, axiosConfig);
            }

            return api.request<TResponse, AxiosResponse<TResponse>>({
                url,
                method,
                data: payload,
                ...axiosConfig,
            });
        },
        onError: (error, variables, onMutateResult, context) => {
            if (variables.formApi !== undefined) handleFormValidationError(error, variables.formApi);
            onError?.(error, variables, onMutateResult, context);
        },
    });
}

export function useFormMutation<TResponse = any, TPayload = any, TError = LaravelValidationErrors>(
    options: FormMutation<TResponse, TPayload, TError>, queryClient?: QueryClient
) {
    return useMutation({
        ...formMutationOptions(options)
    }, queryClient);
}
