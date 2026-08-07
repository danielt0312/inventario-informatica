import {
    requiredIsoDateLTEToday,
    requiredArray,
    selectedNumberOption,
    positiveInteger,
    requiredString,
    nullableString
} from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import type { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import type { NullableNumeroInventarioField } from "@/views/common/articulos/form-fields";
import type { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import type { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import type { FechaSolicitudField, FolioField, OficioFieldType } from "../partials/form-fields";
import type { NumberInputField } from "@/components/composed/@tanstack/form/input-field";
import z from "zod";

type AdquisicionFields = {
    producto_tipo_id: ProductoTipoField;
    numero_inventario: NullableNumeroInventarioField;
    cantidad: NumberInputField;
    empleado_id: EmpleadoField;
}

export const productoFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    producto_tipo_id: undefined,
    cantidad: 1,
    empleado_id: undefined,
} as const;

export type Schema = {
    folio: FolioField;
    fecha_solicitud: FechaSolicitudField;
    adscripcion_id: AdscripcionField;
    archivo_uuid: OficioFieldType;
    adquisiciones: AdquisicionFields[];
}

export const dictamenDefaultValues: Schema = {
    folio: undefined,
    fecha_solicitud: undefined,
    adscripcion_id: undefined,
    archivo_uuid: undefined,
    adquisiciones: [productoFieldsDefaultValues]
} as const;

const adquisicionValidator = z
    .object({
        cantidad: positiveInteger,
        empleado_id: selectedNumberOption,
        producto_tipo_id: selectedNumberOption,
        numero_inventario: nullableString
    });

export const validator = z.object({
    folio: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    adscripcion_id: selectedNumberOption,
    archivo_uuid: requiredString,
    adquisiciones: requiredArray(adquisicionValidator
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
        }, {
            when: ({ value }) =>
                adquisicionValidator.pick({ numero_inventario: true, producto_tipo_id: true })
                    .safeParse(value)
                    .success
        })
    )
});
