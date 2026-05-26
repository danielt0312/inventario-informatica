import type {
    AnyFormApi
} from "@tanstack/react-form";
import {
    clsx,
    type ClassValue
} from "clsx";
import { twMerge } from "tailwind-merge";
import type {
    LaravelValidationErrors,
    TCatalogo,
    WithPrefix
} from "./types";
import type { ComboboxOption } from "@/components/composed/combobox-creatable";
import {
    parseISO,
    isValid
} from "date-fns"
import { isAxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function setFormValidationErrors(
    formApi: AnyFormApi,
    errors: LaravelValidationErrors
) {
    const errorKeys = Object.keys(errors);

    if (errorKeys.length === 0) return;

    errorKeys.forEach((field) => {
        const errorMessage = errors[field][0];

        formApi.setFieldMeta(field as any, (prev) => ({
            ...prev,
            errors: [{ message: errorMessage }],
            errorMap: {
                ...prev.errorMap,
                onSubmit: errorMessage
            },
            isTouched: true,
        }))
    });
}

export function handleFormValidationError(error: unknown, formApi: AnyFormApi) {
    if (isAxiosError(error) && error.response?.status === 422) {
        setFormValidationErrors(formApi, error.response.data.errors);
    }
}

export const catalogoToOption = ({
    id,
    nombre
}: TCatalogo): ComboboxOption => ({
    value: String(id),
    label: nombre,
})
export const toOptions = (list: TCatalogo[]): ComboboxOption[] =>
    list.map(catalogoToOption)

export const toISODate = (d: Date | undefined): string =>
    d?.toISOString().slice(0, 10) ?? ""

export const fromISO = (v: unknown): Date | undefined => {
    if (!v || typeof v !== "string") return undefined
    const parsed = parseISO(v)
    return isValid(parsed) ? parsed : undefined
}

export function addPrefix<T extends object, P extends string>(obj: T, prefix: P): WithPrefix<T, P> {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [`${prefix}${k}`, v])
    ) as WithPrefix<T, P>;
}
