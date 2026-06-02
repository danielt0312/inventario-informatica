import { FormValidationError } from "@/lib/constants";
import type { IdValue } from "@/lib/types";
import {
    prefixedDefaultValues as productoPrefixedDefaultValues,
    type PrefixedProductoFields,
    prefixedValidator as productoValidatorPrefixed
} from "@/views/productos/form-schema";
import z from "zod";

export type DictamenProducto = PrefixedProductoFields & {
    cantidad: number;
    empleado_id: IdValue;
}

export const dictamenProductoDefaultValues: DictamenProducto = {
    ...productoPrefixedDefaultValues,
    cantidad: 1,
    empleado_id: null,
} as const;

export type Dictamen = {
    folio: string | null;
    fecha_solicitud: string | null;
    adscripcion_id: IdValue;
    archivo: File[] | undefined;
    productos: DictamenProducto[]
}

export const dictamenDefaultValues: Dictamen = {
    folio: null,
    fecha_solicitud: null,
    adscripcion_id: null,
    archivo: undefined,
    productos: [dictamenProductoDefaultValues]
} as const;

export const validator = z.object({
    folio: z
        .string(FormValidationError.REQUIRED)
        .trim()
        .refine(
            v => v !== '',
            FormValidationError.REQUIRED
        ),
    fecha_solicitud: z
        .iso
        .date(FormValidationError.REQUIRED)
        .refine(
            v => new Date(v) <= new Date,
            'Esta fecha debe ser menor o igual a hoy'
        ),
    adscripcion_id: z
        .number('Debes de seleccionar una opción')
        .int(),
    archivo: z
        .array(z
            .file()
            .max(5_000_000, 'El archivo no debe superar 5MB')
        , 'Debes de adjuntar un archivo')
        .min(1, 'Debes de seleccionar un archivo')
        .max(1, 'Solo puedes subir un archivo'),
    productos: z
        .array(
            productoValidatorPrefixed.extend({
                cantidad: z
                    .number(FormValidationError.REQUIRED)
                    .int()
                    .min(1, 'Este campo debe ser mínimo de 1'),
                empleado_id: z
                    .number('Debes de seleccionar una opción')
                    .int()
            }))
        .min(1, 'Debes de agregar cuando menos 1 producto')
});

export type OutputSchema = z.output<typeof validator>;
