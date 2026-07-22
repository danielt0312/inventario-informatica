import {
    requiredIsoDateLTEToday,
    requiredArray,
    selectedNumberOption,
    standardPdfFile,
    positiveInteger,
    requiredString,
    nullableString
} from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import type { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import type { NullableNumeroInventarioField } from "@/views/common/articulos/form-fields";
import type { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import type { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import type { OficioField, FechaSolicitudField, FolioField } from "./form-fields";
import type { NumberInputField } from "@/components/composed/@tanstack/form/input-field";
import z from "zod";

type ProductoFieldsGroup = {
    producto_tipo_id: ProductoTipoField;
    numero_inventario: NullableNumeroInventarioField;
}

export const productoFieldsGroupDefaultValues: ProductoFieldsGroup = {
    producto_tipo_id: undefined,
    numero_inventario: null
}

const productoFieldsGroupValidator = z.object({
    producto_tipo_id: selectedNumberOption,
    numero_inventario: nullableString
})

type AdquisicionFields = ProductoFieldsGroup & {
    cantidad: NumberInputField;
    empleado_id: EmpleadoField;
}

export const productoFieldsDefaultValues: AdquisicionFields = {
    ...productoFieldsGroupDefaultValues,
    cantidad: 1,
    empleado_id: undefined,
} as const;

export type Schema = {
    folio: FolioField;
    fecha_solicitud: FechaSolicitudField;
    adscripcion_id: AdscripcionField;
    archivo: OficioField;
    adquisiciones: AdquisicionFields[];
}

export const dictamenDefaultValues: Schema = {
    folio: undefined,
    fecha_solicitud: undefined,
    adscripcion_id: undefined,
    archivo: undefined,
    adquisiciones: [productoFieldsDefaultValues]
} as const;

export const validator = z.object({
    folio: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    adscripcion_id: selectedNumberOption,
    archivo: standardPdfFile(),
    adquisiciones: requiredArray(z
        .object({
            cantidad: positiveInteger,
            empleado_id: selectedNumberOption,
            producto_tipo_id: productoFieldsGroupValidator.shape.producto_tipo_id,
            numero_inventario: productoFieldsGroupValidator.shape.numero_inventario
        })
        .superRefine(({ producto_tipo_id, numero_inventario }, ctx) => {
            if (DictamenProducto.tipoRequiereNumeroInventario(producto_tipo_id)) {
                if (numero_inventario === null || numero_inventario.length === 0) {
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
