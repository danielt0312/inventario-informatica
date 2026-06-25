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
import { dictamenProductoTiposRequierenNumeroInventario, ProductoCategoriaEnum, ProductoTipoEnum, ProductoTipoProductoCategoriaMap } from "./constants";

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

export const toOptions = <T extends any>(
    list: T[],
    groupAccessor?: string | ((item: T) => any)
): ComboboxOption[] => {
    // 1. Detectar si el groupAccessor es un path anidado (ej. 'tipos.nombre')
    if (typeof groupAccessor === 'string' && groupAccessor.includes('.')) {
        const [arrayKey] = groupAccessor.split('.');

        // 2. Si la propiedad del primer objeto es un Arreglo, activamos el modo "aplanado"
        if (list.length > 0 && Array.isArray((list[0] as any)[arrayKey])) {
            return list.flatMap((parent: any) => {
                const children = parent[arrayKey] || [];
                // El nombre del objeto padre (la Categoría) se convierte en el nombre del grupo
                const groupName = parent.nombre || '';

                // Mapeamos los hijos (los Tipos) como las opciones reales del combobox
                return children.map((child: any) => ({
                    value: String(child.id),
                    label: child.nombre,
                    group: groupName,
                }));
            });
        }
    }

    // 3. Comportamiento por defecto original si es una lista plana o relación 1 a 1
    return list.map((item) => catalogoToComboboxOption(item as any, groupAccessor));
};

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

export function spatieFilterTransformer<TFilters extends object>(
    filters?: TFilters
): Record<string, unknown> {
    if (!filters) return {};

    const filterParams: Record<string, unknown> = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (value === '' || value === null || value === undefined) {
            return;
        }

        if (Array.isArray(value)) {
            if (value.length > 0) {
                filterParams[key] = value.join(',');
            }
        } else {
            filterParams[key] = value;
        }
    });

    return Object.keys(filterParams).length > 0 ? { filter: filterParams } : {};
}

export const cleanText = (text: string): string => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, "")
        .trim();
};

export const Producto = {
    categoria: ProductoCategoriaEnum,
    tipo: ProductoTipoEnum,
    isValidTipo(value: unknown): value is ProductoTipoEnum {
        if (value === null || value === undefined || value === '') return false;
        return Number(value) in ProductoTipoProductoCategoriaMap;
    },
    getTipo(value: unknown): ProductoTipoEnum | undefined {
        return this.isValidTipo(value)
            ? Number(value) as ProductoTipoEnum
            : undefined;
    },
    getCategoriaByTipo(tipo: unknown): ProductoCategoriaEnum | undefined {
        return this.isValidTipo(tipo)
            ? ProductoTipoProductoCategoriaMap[tipo]
            : undefined;
    },
    tipoEsDeCategoria(tipo: unknown, categoria: ProductoCategoriaEnum): boolean {
        return this.getCategoriaByTipo(tipo) === categoria;
    },
    tipoEsCategoriaComputadora(tipo: unknown): boolean {
        return this.tipoEsDeCategoria(tipo, this.categoria.COMPUTADORA);
    }
}

export const DictamenProducto = {
    ...Producto,
    tipos_requieren_numero_inventario: dictamenProductoTiposRequierenNumeroInventario,
    tipoRequiereNumeroInventario(tipo: unknown): boolean {
        const validTipo = this.getTipo(tipo);
        return validTipo !== undefined && this.tipos_requieren_numero_inventario.includes(validTipo);
    }
}
