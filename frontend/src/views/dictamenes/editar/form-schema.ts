import type { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import { CaracteristicasField, type FechaSolicitudField, type FolioField, type OficioField } from "../partials/form-fields"
import type { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import type { ProductoField } from "@/views/common/productos/form-fields";
import type { NullableNumeroInventarioField } from "@/views/common/articulos/form-fields";
import type { NumberInputField } from "@/components/composed/@tanstack/form/input-field";
import type { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import type { DetailedSurtirDictamen } from "@/types/dictamenes";
import z from "zod";
import { nullableString, positiveInteger, requiredArray, requiredIsoDateLTEToday, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";

type AdquisicionFields = {
    producto_tipo_id: ProductoTipoField;
    numero_inventario: NullableNumeroInventarioField;
    cantidad: NumberInputField;
    empleado_id: EmpleadoField;
    caracteristicas: CaracteristicasField;
    producto_id: ProductoField;
}

export const adquisicionFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    producto_tipo_id: undefined,
    producto_id: undefined,
    cantidad: 1,
    empleado_id: undefined,
    caracteristicas: undefined,
} as const;

type Schema = {
    fecha_solicitud: FechaSolicitudField;
    adscripcion_id: AdscripcionField;
    archivo_uuid: OficioField;
    folio: FolioField;
    adquisiciones: AdquisicionFields[];
}

export const defaultValues = (dictamen: DetailedSurtirDictamen): Schema => ({
    fecha_solicitud: dictamen.version_actual.fecha_solicitud,
    adscripcion_id: dictamen.version_actual.adscripcion?.id ?? 1,
    archivo_uuid: dictamen.version_actual.oficio.archivo.uuid,
    folio: dictamen.version_actual.oficio.folio,
    adquisiciones: dictamen.version_actual.adquisiciones.map((adquiscion): AdquisicionFields => ({
        cantidad: adquiscion.cantidad,
        producto_tipo_id: adquiscion.producto.tipo.id,
        producto_id: adquiscion.producto.id,
        empleado_id: adquiscion.empleado?.id ?? 1,
        numero_inventario: adquiscion.articulo?.numero_inventario ?? null,
        caracteristicas: adquiscion.caracteristicas ?? undefined
    }))
});

const adquisicionValidator = z
    .object({
        numero_inventario: nullableString,
        producto_tipo_id: selectedNumberOption,
        producto_id: selectedNumberOption,
        cantidad: positiveInteger,
        empleado_id: selectedNumberOption,
        caracteristicas: requiredString
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
