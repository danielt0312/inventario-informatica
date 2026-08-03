import type { AdscripcionField } from "@/views/common/externos/adscripciones/form-fields";
import type { FechaSolicitudField, FolioField, OficioField } from "../partials/form-fields"
import type { ProductoTipoField } from "@/views/common/productos/tipos/form-fields";
import type { ProductoField } from "@/views/common/productos/form-fields";
import type { NullableNumeroInventarioField } from "@/views/common/articulos/form-fields";
import type { NumberInputField } from "@/components/composed/@tanstack/form/input-field";
import type { EmpleadoField } from "@/views/common/externos/empleados/form-fields";
import type { DetailedSurtirDictamen } from "@/types/dictamenes";

type AdquisicionFields = {
    producto_tipo_id: ProductoTipoField;
    producto_id: ProductoField;
    numero_inventario: NullableNumeroInventarioField;
    cantidad: NumberInputField;
    empleado_id: EmpleadoField;
}

export const adquisicionFieldsDefaultValues: AdquisicionFields = {
    numero_inventario: null,
    producto_tipo_id: undefined,
    producto_id: undefined,
    cantidad: 1,
    empleado_id: undefined,
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
        numero_inventario: adquiscion.articulo?.numero_inventario ?? null
    }))
});
