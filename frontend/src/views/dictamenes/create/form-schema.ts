import {
    NonEmptyString,
    RequiredIsoDateLTEToday,
    RequiredPositiveInteger,
    ArrayStandardFile,
    RequiredArray,
    TrimmedString,
    NonEmptyStringToNumber
} from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import type { TipoField } from "@/views/common/productos/tipos/partials/form-fields";
import type { NumeroInventarioField } from "@/views/common/numero-inventario/form-fields";
import type { EmpleadoField } from "@/views/externos/empleados/partials/form-fields";
import type { AdscripcionField } from "@/views/externos/adscripciones/partials/form-fields";
import type { OficioField, CantidadField, FechaSolicitudField, FolioField } from "./form-fields";
import z from "zod";

type ProductoFieldsGroup = {
    producto_tipo_id: TipoField;
    numero_inventario: NumeroInventarioField;
}

export const productoFieldsGroupDefaultValues: ProductoFieldsGroup = {
    producto_tipo_id: '',
    numero_inventario: ''
}

const productoFieldsGroupValidator = z.object({
    producto_tipo_id: NonEmptyStringToNumber,
    numero_inventario: TrimmedString
})

type ProductoFields = ProductoFieldsGroup & {
    cantidad: CantidadField;
    empleado_id: EmpleadoField;
}

export const productoFieldsDefaultValues: ProductoFields = {
    cantidad: '1',
    empleado_id: '',
    ...productoFieldsGroupDefaultValues
} as const;

export type Schema = {
    folio: FolioField;
    fecha_solicitud: FechaSolicitudField;
    adscripcion_id: AdscripcionField;
    archivo: OficioField;
    productos: ProductoFields[];
}

export const dictamenDefaultValues: Schema = {
    folio: '',
    fecha_solicitud: '',
    adscripcion_id: '',
    archivo: undefined,
    productos: [productoFieldsDefaultValues]
} as const;

export const validator = z.object({
    folio: NonEmptyString,
    fecha_solicitud: RequiredIsoDateLTEToday,
    adscripcion_id: NonEmptyStringToNumber,
    archivo: ArrayStandardFile,
    productos: RequiredArray(z
        .object({
            cantidad: RequiredPositiveInteger,
            empleado_id: NonEmptyStringToNumber,
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
