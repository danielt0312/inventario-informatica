import {
    NonEmptyString,
    RequiredIsoDateLTEToday,
    RequiredPositiveInteger,
    ArrayStandardFile,
    RequiredArray,
    TrimmedString
} from "@/lib/schemas/common";
import * as CatalogoSchema from "../../common/forms/schemas";
import z from "zod";
import * as NumeroInventarioField from "@/views/common/numero-inventario/form-schema";
import { DictamenProducto } from "@/lib/utils";

type ProductoFieldsGroup = {
    producto_tipo_id: CatalogoSchema.Field;
    numero_inventario: NumeroInventarioField.Field;
}

export const productoFieldsGroupDefaultValues: ProductoFieldsGroup = {
    producto_tipo_id: CatalogoSchema.defaultValue,
    numero_inventario: NumeroInventarioField.defaultValue
}

const productoFieldsGroupValidator = z.object({
    producto_tipo_id: CatalogoSchema.validator,
    numero_inventario: TrimmedString
})

type ProductoFields = ProductoFieldsGroup & {
    cantidad: string;
    empleado_id: CatalogoSchema.Field;
}

export const productoFieldsDefaultValues: ProductoFields = {
    cantidad: '1',
    empleado_id: CatalogoSchema.defaultValue,
    ...productoFieldsGroupDefaultValues
} as const;

export type Schema = {
    folio: string;
    fecha_solicitud: string;
    adscripcion_id: CatalogoSchema.Field;
    archivo: File[] | undefined;
    productos: ProductoFields[];
}

export const dictamenDefaultValues: Schema = {
    folio: '',
    fecha_solicitud: '',
    adscripcion_id: CatalogoSchema.defaultValue,
    archivo: undefined,
    productos: [productoFieldsDefaultValues]
} as const;

export const validator = z.object({
    folio: NonEmptyString,
    fecha_solicitud: RequiredIsoDateLTEToday,
    adscripcion_id: CatalogoSchema.validator,
    archivo: ArrayStandardFile,
    productos: RequiredArray(z
        .object({
            cantidad: RequiredPositiveInteger,
            empleado_id: CatalogoSchema.validator,
            producto_tipo_id: productoFieldsGroupValidator.shape.producto_tipo_id,
            numero_inventario: productoFieldsGroupValidator.shape.numero_inventario
        })
        .superRefine(({ producto_tipo_id, numero_inventario }, ctx) => {
            if (DictamenProducto.tipoRequiereNumeroInventario(producto_tipo_id)) {
                if (numero_inventario.length === 0) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Este campo es requerido',
                        path: ['numero_inventario']
                    });
                } else if (numero_inventario.length != 11) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'El número de inventario debe de contener 11 caracteres',
                        path: ['numero_inventario']
                    });
                }
            }
        })
    )
});

export type InputSchema = z.input<typeof validator>;
export type OutputSchema = z.output<typeof validator>;
