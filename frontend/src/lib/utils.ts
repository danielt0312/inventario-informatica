import type { AnyFormApi } from "@tanstack/react-form"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type LaravelValidationErrors = Record<string, string[]>;

export function handleLaravel422(
    formApi: AnyFormApi,
    errors: LaravelValidationErrors,
    scrollToFirstError: boolean = false
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

    if (scrollToFirstError) {
        setTimeout(() => {
            const firstErrorField = document.getElementsByName(errorKeys[0])[0];
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
        }, 10);
    }
}
