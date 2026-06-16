import {
    NonEmptyString,
    RequiredIsoDateLTEToday,
    RequiredPositiveInteger,
    ArrayStandardFile,
    RequiredArray,
    NonEmptyStringToNumber,
    TrimmedString
} from "@/lib/schemas/common";
import {
    defaultValues as productoDefaultValues,
    validator as productoValidator,
    type Schema as ProductoSchema
} from "@/views/productos/form-schema";
import z from "zod";

export type ProductoFields = {
    cantidad: string;
    producto_tipo_id: ProductoSchema['tipo_id'];
    empleado_id: string;
    numero_inventario: string;
}

export const dictamenProductoDefaultValues: ProductoFields = {
    cantidad: '1',
    producto_tipo_id: productoDefaultValues['tipo_id'],
    empleado_id: '',
    numero_inventario: ''
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

// todo
export const tipos = [1, 2, 3];

export const validator = z.object({
    folio: NonEmptyString,
    fecha_solicitud: RequiredIsoDateLTEToday,
    adscripcion_id: NonEmptyStringToNumber,
    archivo: ArrayStandardFile,
    productos: RequiredArray(z
        .object({
            cantidad: RequiredPositiveInteger,
            producto_tipo_id: productoValidator.shape.tipo_id,
            empleado_id: NonEmptyStringToNumber,
            numero_inventario: TrimmedString
        }).refine(
            ({ producto_tipo_id, numero_inventario }) => numero_inventario.length === 0 && !tipos.includes(producto_tipo_id),
            {
                message: "Este campo es requerido",
                path: ["numero_inventario"]
            }
        ),
    )
});

export type InputSchema = z.input<typeof validator>;
export type OutputSchema = z.output<typeof validator>;
