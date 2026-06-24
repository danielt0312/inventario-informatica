import {
    NonEmptyString,
    RequiredIsoDateLTEToday,
    RequiredPositiveInteger,
    ArrayStandardFile,
    RequiredArray,
    TrimmedString
} from "@/lib/schemas/common";
import { defaultValues as productoDefaultValues, type Schema as ProductoTipoSchema, validator as productoTipoValidator } from "@/views/productos/tipos/partials/form-schema";
import { defaultValues as adscripcionDefaultValues, type Schema as AdscripcionSchema, validator as adscripcionValidator } from "../../externos/adscripciones/partials/form-schema";
import { defaultValues as empleadoDefaultValues, type Schema as EmpleadoSchema, validator as empleadoValidator } from "../../externos/empleados/partials/form-schema";
import { ProductoTipo } from "@/lib/constants";
import z from "zod";

type ProductoFieldsGroup = {
    producto_tipo_id: ProductoTipoSchema['id'];
    numero_inventario: string;
}

export const productoFieldsGroupDefaultValues: ProductoFieldsGroup = {
    producto_tipo_id: productoDefaultValues.id,
    numero_inventario: ''
}

const productoFieldsGroupValidator = z.object({
    producto_tipo_id: productoTipoValidator.shape.id,
    numero_inventario: TrimmedString
})

type ProductoFields = ProductoFieldsGroup & {
    cantidad: string;
    empleado_id: EmpleadoSchema['id'];
}

export const productoFieldsDefaultValues: ProductoFields = {
    cantidad: '1',
    empleado_id: empleadoDefaultValues.id,
    ...productoFieldsGroupDefaultValues
} as const;

export type Schema = {
    folio: string;
    fecha_solicitud: string;
    adscripcion_id: AdscripcionSchema['id'];
    archivo: File[] | undefined;
    productos: ProductoFields[];
}

export const dictamenDefaultValues: Schema = {
    folio: '',
    fecha_solicitud: '',
    adscripcion_id: adscripcionDefaultValues.id,
    archivo: undefined,
    productos: [productoFieldsDefaultValues]
} as const;

export const validator = z.object({
    folio: NonEmptyString,
    fecha_solicitud: RequiredIsoDateLTEToday,
    adscripcion_id: adscripcionValidator.shape.id,
    archivo: ArrayStandardFile,
    productos: RequiredArray(z
        .object({
            cantidad: RequiredPositiveInteger,
            empleado_id: empleadoValidator.shape.id,
            producto_tipo_id: productoFieldsGroupValidator.shape.producto_tipo_id,
            numero_inventario: productoFieldsGroupValidator.shape.numero_inventario
        }).refine(
            ({ producto_tipo_id, numero_inventario }) => numero_inventario.length === 0 && !ProductoTipo.esCategoriaComputadora(producto_tipo_id),
            {
                message: "Este campo es requerido",
                path: ["numero_inventario"]
            }
        ),
    )
});

export type InputSchema = z.input<typeof validator>;
export type OutputSchema = z.output<typeof validator>;
