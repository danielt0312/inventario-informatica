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
    WithPrefix
} from "@/types/generics";
import type { TCatalogo } from "@/types/generics";
import {
    parseISO,
    isValid
} from "date-fns"
import { isAxiosError } from "axios";
import { root } from "./axios";
import type { ComboboxOption } from "@/components/composed/creatable-combobox";

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

        formApi.setFieldMeta(field as any, (prev) => {
            const base = prev || {
                errors: [],
                errorMap: {},
                isTouched: false,
            };

            return {
                ...base,
                errors: [{ message: errorMessage }],
                errorMap: {
                    ...base?.errorMap,
                    onSubmit: errorMessage
                },
                isTouched: true,
            }
        })
    });
}

export function handleFormValidationError(
    error: unknown,
    formApi: AnyFormApi,
    onGlobalError?: (message: string) => void,
    defaultFallbackMessage: string = 'Ocurrió un error inesperado'
) {
    if (!isAxiosError(error) || error.response?.status !== 422) return;

    const responseData = error.response.data || {};
    const responseErrors = responseData.errors || {};
    const fallbackMessage = responseData.message || defaultFallbackMessage;

    const errorKeys = Object.keys(responseErrors);
    const formKeys = Object.keys(formApi.state.values || {});

    const localErrors: LaravelValidationErrors = {};
    let hasGlobal = false;

    errorKeys.forEach((key) => {
        if (formKeys.includes(key)) {
            localErrors[key] = responseErrors[key];
        } else {
            hasGlobal = true;
        }
    });

    if (hasGlobal && onGlobalError) {
        onGlobalError(fallbackMessage);
    }

    if (Object.keys(localErrors).length > 0) {
        setFormValidationErrors(formApi, localErrors);
    }
}

const getValueByPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const catalogoToComboboxOption = <T extends TCatalogo>(
  item: T,
  groupAccessor?: string | ((item: T) => any)
): ComboboxOption => {
  const option: ComboboxOption = {
    value: String(item.id),
    label: item.nombre,
  };

  if (groupAccessor) {
    // Evaluamos si es una función o un string de acceso
    const resolvedGroup = typeof groupAccessor === 'function'
      ? groupAccessor(item)
      : getValueByPath(item, groupAccessor);

    // Si el valor devuelto es un string, lo asignamos directamente
    if (typeof resolvedGroup === 'string') {
      option.group = resolvedGroup;
    }
    // Flexibilidad extra: Si es un objeto que tiene una propiedad 'nombre', la usamos
    else if (resolvedGroup && typeof resolvedGroup === 'object' && 'nombre' in resolvedGroup) {
      option.group = String(resolvedGroup.nombre);
    }
  }

  return option;
};

export const toOptions = <T extends TCatalogo>(
  list: T[],
  groupAccessor?: string | ((item: T) => any)
): ComboboxOption[] =>
  list.map((item) => catalogoToComboboxOption(item, groupAccessor));

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

export const getStreamedFile = (uuid: string) => root.get(`api/archivos/${uuid}/stream`, {
    responseType: 'blob'
}).then(r => r.data);

