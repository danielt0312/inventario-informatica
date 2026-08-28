import type { ProductoTipoFieldType } from "@/components/features/productos/tipos/form-fields";
import type { ArticuloNullableNumeroInventarioFieldType } from "@/components/features/articulos/form-fields";
import type { NumberInputFieldType } from "@/components/ui/input-field";
import type { EmpleadoFieldType } from "@/components/features/externos/empleados/form-fields";
import type { DictamenEspecificacionesTecnicasFieldType, DictamenMotivoCambioFieldType, FechaSolicitudFieldType, FolioFieldType, OficioFieldType } from "../partials/form-fields";
import type { ProductoFieldType } from "@/components/features/productos/form-fields";
import { nullableString, positiveInteger, requiredArray, requiredIsoDateLTEToday, requiredString, selectedNumberOption } from "@/lib/schemas/common";
import { format } from "date-fns";
import z from "zod";
import type { DetailedPorSurtirDictamen } from "@/types/dictamenes";

type AdquisicionFields = {
    producto_tipo_id: ProductoTipoFieldType;
    numero_inventario: ArticuloNullableNumeroInventarioFieldType;
    cantidad: NumberInputFieldType;
    empleado_id: EmpleadoFieldType;
    especificaciones_tecnicas: DictamenEspecificacionesTecnicasFieldType;
    producto_id: ProductoFieldType;
}

export const adquisicionFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    producto_tipo_id: undefined,
    producto_id: undefined,
    cantidad: 1,
    empleado_id: undefined,
    especificaciones_tecnicas: undefined,
} as const;

type Schema = {
    fecha_solicitud: FechaSolicitudFieldType;
    archivo_uuid: OficioFieldType;
    folio: FolioFieldType;
    motivo_cambio: DictamenMotivoCambioFieldType;
    adquisiciones: AdquisicionFields[];
}

export const defaultValues = (dictamen: DetailedPorSurtirDictamen): Schema => ({
    motivo_cambio: undefined,
    fecha_solicitud: format(new Date, 'yyyy-MM-dd'),
    archivo_uuid: dictamen.version_actual.oficio?.archivo.uuid,
    folio: dictamen.version_actual.oficio?.folio,
    adquisiciones: dictamen.version_actual.adquisiciones.map((adquiscion): AdquisicionFields => ({
        cantidad: adquiscion.cantidad,
        producto_tipo_id: adquiscion.producto.tipo.id,
        producto_id: adquiscion.producto.id,
        empleado_id: adquiscion.empleado?.id ?? 1,
        numero_inventario: adquiscion.articulo?.numero_inventario ?? null,
        especificaciones_tecnicas: adquiscion.especificaciones_tecnicas ?? undefined
    }))
});

export const validator = z.object({
    motivo_cambio: requiredString,
    folio: requiredString,
    fecha_solicitud: requiredIsoDateLTEToday,
    archivo_uuid: requiredString,
    adquisiciones: requiredArray(z
        .object({
            numero_inventario: nullableString,
            producto_tipo_id: selectedNumberOption,
            producto_id: selectedNumberOption,
            cantidad: positiveInteger,
            empleado_id: selectedNumberOption,
            especificaciones_tecnicas: requiredString
        }))
});
