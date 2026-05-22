import type { AnyFormApi } from "@tanstack/react-form"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LaravelValidationErrors, TCatalogo, WithPrefix } from "./types";
import type { ComboboxOption } from "@/components/composed/combobox-creatable";
import { parseISO, isValid } from "date-fns"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

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

export const catalogoToOption = ({
    id,
    nombre
}: TCatalogo): ComboboxOption => ({
    value: String(id),
    label: nombre,
})
export const toOptions = (list: TCatalogo[]): ComboboxOption[] =>
    list.map(catalogoToOption)

/** Almacena solo la fecha: "2025-05-20" */
export const toISODate = (d: Date | undefined): string =>
  d?.toISOString().slice(0, 10) ?? ""


/** Convierte string ISO de vuelta a Date para el useMemo del Field */
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
