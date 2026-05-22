import type { IdValue, WithPrefix } from "@/lib/types";
import { addPrefix } from "@/lib/utils";
import z from "zod";

export type Fields = {
    categoria_id: IdValue;
    tipo_id: IdValue;
    marca_id: IdValue;
};

export type ProductoFields = Fields & {
    id: IdValue
}

export const defaultValues: ProductoFields = {
    categoria_id: null,
    tipo_id: null,
    marca_id: null,
    id: null,
};

export const validator = z.object({
    categoria_id: z
        .number('Debes de seleccionar una opción')
        .int(),
    tipo_id: z
        .number('Debes de seleccionar una opción')
        .int(),
    marca_id: z
        .number('Debes de seleccionar una opción')
        .int(),
    id: z
        .number('Debes de seleccionar una opción')
        .int(),
});

export const prefix = 'producto_' as const;
export type PrefixedFields = WithPrefix<Fields, typeof prefix>;
export type PrefixedProductoFields = WithPrefix<ProductoFields, typeof prefix>;
export const prefixedDefaultValues = addPrefix(defaultValues, prefix);
export const prefixedValidator = z.object(addPrefix(validator.shape, prefix));
