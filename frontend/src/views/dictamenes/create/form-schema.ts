import {
    NonEmptyString,
    RequiredIsoDateLTEToday,
    RequiredPositiveInteger,
    ArrayStandardFile,
    RequiredArray
} from "@/lib/schemas/common";
import type { WithPrefix } from "@/lib/types";
import { addPrefix } from "@/lib/utils";
import {
    defaultValues as productoDefaultValues,
    validator as productoValidator,
    type Schema as ProductoSchema
} from "@/views/productos/form-schema";
import z from "zod";

type PrefixedProductoSchema = WithPrefix<ProductoSchema, 'producto_'>;
export type ProductoFields = PrefixedProductoSchema & {
    cantidad: string;
    empleado_id: string;
}

const prefixedProductoDefaultValues = addPrefix(productoDefaultValues, 'producto_');
export const dictamenProductoDefaultValues: ProductoFields = {
    ...prefixedProductoDefaultValues,
    cantidad: '1',
    empleado_id: '',
} as const;

export type Schema = {
    folio: string;
    fecha_solicitud: string;
    adscripcion_id: string;
    archivo: File[] | undefined;
    productos: ProductoFields[];
}

export const dictamenDefaultValues: Schema = {
    folio: '',
    fecha_solicitud: '',
    adscripcion_id: '',
    archivo: undefined,
    productos: [dictamenProductoDefaultValues]
} as const;

const prefixedProductoValidator = z.object(addPrefix(productoValidator.shape, 'producto_'));
export const validator = z.object({
    folio: NonEmptyString,
    fecha_solicitud: RequiredIsoDateLTEToday,
    adscripcion_id: NonEmptyString,
    archivo: ArrayStandardFile,
    productos: RequiredArray(
        prefixedProductoValidator.extend({
            cantidad: RequiredPositiveInteger,
            empleado_id: NonEmptyString
        })
    )
});

export type InputSchema = z.input<typeof validator>;
export type OutputSchema = z.output<typeof validator>;
