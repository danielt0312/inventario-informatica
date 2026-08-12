import type { ProductoField } from "@/components/features/productos/form-fields";
import type { ProductoTipoFieldType } from "@/components/features/productos/tipos/form-fields";
import type { NullableNumeroInventarioFieldType } from "@/components/features/articulos/form-fields";
import type { NumberInputFieldType } from "@/components/ui/input-field";
import type { EmpleadoFieldType } from "@/components/features/externos/empleados/form-fields";
import type { CaracteristicasFieldType, FechaSolicitudFieldType, FolioFieldType, OficioFieldType } from "../partials/form-fields";
import type { DetailedSurtirDictamen } from "@/types/dictamenes";
import { nullableString, positiveInteger, requiredArray, requiredIsoDateLTEToday, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { DictamenProducto } from "@/lib/utils";
import { format } from "date-fns";
import z from "zod";

type AdquisicionFields = {
    producto_tipo_id: ProductoTipoFieldType;
    numero_inventario: NullableNumeroInventarioFieldType;
    cantidad: NumberInputFieldType;
    empleado_id: EmpleadoFieldType;
    caracteristicas: CaracteristicasFieldType;
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
    fecha_solicitud: FechaSolicitudFieldType;
    archivo_uuid: OficioFieldType;
    folio: FolioFieldType;
    adquisiciones: AdquisicionFields[];
}

export const defaultValues = (dictamen: DetailedSurtirDictamen): Schema => ({
    fecha_solicitud: format(new Date, 'yyyy-MM-dd'),
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
